const express = require("express");
const { Comment } = require("../models");
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

module.exports = router;
