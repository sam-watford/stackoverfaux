"use strict";
const fs = require("fs");
const path = require("path");

// Load and parse the JSON data
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/stackoverfaux.json"))
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersMap = new Map();
    const questionsMap = new Map();
    const users = [];

    // Seed Users
    data.forEach((question) => {
      const questionUser = question.user;
      if (!usersMap.has(questionUser.id)) {
        users.push({
          name: questionUser.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        usersMap.set(questionUser.id, users.length); // Map old user id to new user id
      }

      question.comments.forEach((comment) => {
        const commentUser = comment.user;
        if (!usersMap.has(commentUser.id)) {
          users.push({
            name: commentUser.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          usersMap.set(commentUser.id, users.length); // Map old user id to new user id
        }
      });

      question.answers.forEach((answer) => {
        const answerUser = answer.user;
        if (!usersMap.has(answerUser.id)) {
          users.push({
            name: answerUser.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          usersMap.set(answerUser.id, users.length); // Map old user id to new user id
        }
      });
    });

    await queryInterface.bulkInsert("users", users);

    // Seed Questions and store mappings of old to new question IDs
    for (const question of data) {
      const result = await queryInterface.bulkInsert(
        "questions",
        [
          {
            title: question.title,
            body: question.body,
            score: question.score,
            creation: new Date(question.creation * 1000), // Convert UNIX timestamp
            user_id: usersMap.get(question.user.id), // Use mapped user ID
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { returning: ["id"] }
      );
      questionsMap.set(question.id, result[0].id); // Map old question ID to new question ID
    }

    // Seed Answers
    const answers = [];
    for (const question of data) {
      question.answers.forEach((answer) => {
        answers.push({
          body: answer.body,
          score: answer.score,
          creation: new Date(answer.creation * 1000), // Convert UNIX timestamp
          question_id: questionsMap.get(question.id), // Use mapped question ID
          user_id: usersMap.get(answer.user.id), // Use mapped user ID
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }
    await queryInterface.bulkInsert("answers", answers);

    // Seed Comments
    const comments = [];
    for (const question of data) {
      question.comments.forEach((comment) => {
        comments.push({
          body: comment.body,
          user_id: usersMap.get(comment.user.id), // Use mapped user ID
          question_id: questionsMap.get(question.id), // Use mapped question ID
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    }
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
