const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();

// POST /auth/register: Register a new user (username only)
router.post("/register", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Check if user already exists
    let user = await User.findOne({ where: { name } });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create new user
    user = await User.create({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error while registering user." });
  }
});

// POST /auth/login: Log in with username (no password)
router.post("/login", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Check if user exists
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(400).json({ message: "Invalid username." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error while logging in." });
  }
});

module.exports = router;
