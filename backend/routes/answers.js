const express = require("express");
const { Answer, Comment, User } = require("../models");
const auth = require("../middleware/auth");
const router = express.Router();

// GET /answers/:id: Retrieve a specific answer with comments, converting user_id to userName
router.get("/:id", async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }], // Include user name for each comment
        },
        { model: User, attributes: ["name"] }, // Include user name for the answer itself
      ],
    });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found." });
    }

    // Map the comments and include userName instead of user_id
    const commentsWithUserNames = answer.Comments.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
        userName: comment.User.name, // Convert user_id to userName for the comment
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });

    // Convert the answer user_id to userName and add the modified comments
    const answerWithDetails = {
      id: answer.id,
      body: answer.body,
      score: answer.score,
      accepted: answer.accepted,
      creation: answer.creation,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      userName: answer.User.name, // Convert user_id to userName for the answer
      comments: commentsWithUserNames, // Include the updated comments with userName
    };

    res.status(200).json(answerWithDetails);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while retrieving the answer." });
  }
});

// POST /answers: Add a new answer (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { body, questionId } = req.body;

    if (!body || !questionId) {
      return res
        .status(400)
        .json({ message: "Body and questionId are required." });
    }

    const answer = await Answer.create({
      body,
      user_id: req.user.id, // Extracted from JWT token
      question_id: questionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Server error while creating the answer." });
  }
});

// DELETE /answers/:id: Delete a specific answer (protected, only creator can delete)
router.delete("/:id", auth, async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found." });
    }

    // Check if the authenticated user is the creator of the answer
    if (answer.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this answer." });
    }

    await answer.destroy();
    res.status(200).json({ message: "Answer deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting the answer." });
  }
});

module.exports = router;
