const express = require("express");
const { Comment, User } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

/**
 * @api {post} /comments Add a new comment
 * @apiName PostComment
 * @apiGroup Comments
 * @apiParam {String} body Comment body.
 * @apiParam {Number} [questionId] Question ID (optional if comment is for a question).
 * @apiParam {Number} [answerId] Answer ID (optional if comment is for an answer).
 * @apiSuccess {Object} comment Newly created comment.
 * @apiSuccess {Number} comment.id Comment id.
 * @apiSuccess {String} comment.body Comment body.
 * @apiError (400) {String} message Body and either questionId or answerId are required.
 * @apiError (500) {String} error Server error while creating the comment.
 */
router.post("/", auth, async (req, res) => {
  try {
    const { body, questionId, answerId } = req.body;

    if (!body || (!questionId && !answerId)) {
      return res.status(400).json({
        message: "Body and either questionId or answerId are required.",
      });
    }

    const comment = await Comment.create({
      body,
      user_id: req.user.id, // Extracted from JWT token
      question_id: questionId || null,
      answer_id: answerId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Server error while creating the comment." });
  }
});

/**
 * @api {get} /comments Get comments associated with a question or answer
 * @apiName GetComments
 * @apiGroup Comments
 * @apiParam {Number} [questionId] Question ID (optional if comments are for a question).
 * @apiParam {Number} [answerId] Answer ID (optional if comments are for an answer).
 * @apiSuccess {Object[]} comments List of comments.
 * @apiError (400) {String} message Either questionId or answerId is required.
 * @apiError (500) {String} error Server error while retrieving the comments.
 */
router.get("/", async (req, res) => {
  try {
    const { questionId, answerId } = req.query;

    if (!questionId && !answerId) {
      return res.status(400).json({
        message: "Either questionId or answerId is required.",
      });
    }

    let comments;
    if (questionId) {
      comments = await Comment.findAll({
        where: { question_id: questionId },
        include: [{ model: User, attributes: ["name"] }],
        order: [["createdAt", "DESC"]],
      });
    } else if (answerId) {
      comments = await Comment.findAll({
        where: { answer_id: answerId },
        include: [{ model: User, attributes: ["name"] }],
        order: [["createdAt", "DESC"]],
      });
    }

    const commentsWithUserNames = comments.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
        userName: comment.User ? comment.User.name : "unknown", // Convert user_id to userName for the comment
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });

    res.status(200).json(commentsWithUserNames);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while retrieving the comments." });
  }
});

module.exports = router;
