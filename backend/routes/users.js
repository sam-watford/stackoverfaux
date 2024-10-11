const express = require("express");
const { User } = require("../models");
const router = express.Router();

// GET /users: Retrieve the list of all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name"], // Only return id and name
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error while retrieving users." });
  }
});

// GET /users/:id: Retrieve a specific user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name"], // Only return id and name
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error while retrieving the user." });
  }
});

module.exports = router;
