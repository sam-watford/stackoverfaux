"use strict";
const fs = require("fs");
const path = require("path");

// Load and parse the JSON data
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/stackoverfaux.json"))
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    data.forEach((question) => {
      const questionUser = question.user;
      if (!users.some((user) => user.id === questionUser.id)) {
        users.push({
          id: questionUser.id,
          name: questionUser.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      question.comments.forEach((comment) => {
        const commentUser = comment.user;
        if (!users.some((user) => user.id === commentUser.id)) {
          users.push({
            id: commentUser.id,
            name: commentUser.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });

      question.answers.forEach((answer) => {
        const answerUser = answer.user;
        if (!users.some((user) => user.id === answerUser.id)) {
          users.push({
            id: answerUser.id,
            name: answerUser.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        answer.comments.forEach((comment) => {
          const commentUser = comment.user;
          if (!users.some((user) => user.id === commentUser.id)) {
            users.push({
              id: commentUser.id,
              name: commentUser.name,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        });
      });
    });

    await queryInterface.bulkInsert("users", users);

    const questions = data.map((question) => ({
      id: question.id,
      title: question.title,
      body: question.body,
      score: question.score,
      creation: new Date(question.creation * 1000), // Convert UNIX timestamp
      user_id: question.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert("questions", questions);

    const answers = [];
    data.forEach((question) => {
      question.answers.forEach((answer) => {
        answers.push({
          id: answer.id,
          body: answer.body,
          score: answer.score,
          creation: new Date(answer.creation * 1000), // Convert UNIX timestamp
          question_id: answer.question_id || question.id,
          user_id: answer.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });
    await queryInterface.bulkInsert("answers", answers);

    const comments = [];
    data.forEach((question) => {
      question.comments.forEach((comment) => {
        comments.push({
          id: comment.id,
          body: comment.body,
          user_id: comment.user.id,
          question_id: comment.question_id || question.id,
          answer_id: null, // Comment is associated with a question, not an answer
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      question.answers.forEach((answer) => {
        answer.comments.forEach((comment) => {
          comments.push({
            id: comment.id,
            body: comment.body,
            user_id: comment.user.id,
            question_id: null, // Comment is associated with an answer, not a question
            answer_id: answer.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });
    });
    await queryInterface.bulkInsert("comments", comments);
  },

  down: async (queryInterface, Sequelize) => {
    // Roll back seeding
    await queryInterface.bulkDelete("comments", null, {});
    await queryInterface.bulkDelete("answers", null, {});
    await queryInterface.bulkDelete("questions", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
