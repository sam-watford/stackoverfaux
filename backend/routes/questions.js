const express = require("express");
const { Question, Answer, Comment, User } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

/**
 * @api {get} /questions Retrieve all questions
 * @apiName GetQuestions
 * @apiGroup Questions
 * @apiSuccess {Object[]} questions List of questions.
 * @apiSuccess {Number} questions.id Question id.
 * @apiSuccess {String} questions.title Question title.
 * @apiSuccess {String} questions.body Question body.
 * @apiSuccess {Number} questions.score Question score.
 * @apiError (500) {String} error Server error while retrieving questions.
 */
router.get("/", async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: {
        model: User,
        attributes: ["name"], // Include only the user's name
      },
      attributes: [
        "id",
        "title",
        "body",
        "score",
        "creation",
        "createdAt",
        "updatedAt",
      ], // Exclude user_id
    });

    const questionsWithCounts = await Promise.all(
      questions.map(async (question) => {
        const answerCount = await question.countAnswers();
        const commentCount = await question.countComments();
        const { id, title, body, score, creation, createdAt, updatedAt } =
          question.toJSON();
        return {
          id,
          title,
          body,
          score,
          creation,
          createdAt,
          updatedAt,
          userName: question.User.name, // Add the user's name
          answerCount,
          commentCount,
        };
      })
    );

    res.status(200).json(questionsWithCounts);
  } catch (err) {
    res.status(500).json({ error: "Server error while retrieving questions." });
  }
});

/**
 * @api {post} /questions Create a new question
 * @apiName PostQuestion
 * @apiGroup Questions
 * @apiParam {String} title Question title.
 * @apiParam {String} body Question body.
 * @apiSuccess {Object} question Newly created question.
 * @apiSuccess {Number} question.id Question id.
 * @apiSuccess {String} question.title Question title.
 * @apiSuccess {String} question.body Question body.
 * @apiSuccess {Number} question.score Question score.
 * @apiError (400) {String} message Title and body are required.
 * @apiError (500) {String} error Server error while creating the question.
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title, body, score = 0 } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required." });
    }

    const userId = req.user.id;

    const newQuestion = await Question.create({
      title,
      body,
      score,
      creation: new Date(),
      user_id: userId, // Use the authenticated user’s ID
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while creating the question." });
  }
});

/**
 * @api {get} /questions/:id Retrieve a specific question
 * @apiName GetQuestionById
 * @apiGroup Questions
 * @apiParam {Number} id Question's unique ID.
 * @apiSuccess {Number} id Question id.
 * @apiSuccess {String} title Question title.
 * @apiSuccess {String} body Question body.
 * @apiSuccess {String} userName The name of the user who posted the question.
 * @apiError (404) {String} message Question not found.
 * @apiError (500) {String} error Server error while retrieving the question.
 */
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [
        {
          model: Answer,
          include: [
            { model: User, attributes: ["name"] }, // Include user name for each answer
            { model: Comment }, // Include comments for each answer
          ],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }], // Include user name for each comment on the question
        },
        { model: User, attributes: ["name"] }, // Include user name for the question itself
      ],
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const answersWithCounts = question.Answers.map((answer) => {
      return {
        id: answer.id,
        body: answer.body,
        score: answer.score,
        accepted: answer.accepted,
        creation: answer.creation,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
        userName: answer.User.name, // Convert user_id to userName for the answer
        commentCount: answer.Comments.length, // Correct count of comments on the answer
      };
    });

    const commentsWithUserNames = question.Comments.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
        userName: comment.User.name, // Convert user_id to userName for the comment
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });

    const questionWithDetails = {
      id: question.id,
      title: question.title,
      body: question.body,
      score: question.score,
      creation: question.creation,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      userName: question.User.name, // Convert user_id to userName
      answers: answersWithCounts, // Include the updated answers with userName and comment count
      comments: commentsWithUserNames, // Include the updated comments with userName
    };

    res.status(200).json(questionWithDetails);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while retrieving the question." });
  }
});

module.exports = router;
