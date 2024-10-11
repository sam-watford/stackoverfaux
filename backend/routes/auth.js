const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();

/**
 * @api {post} /auth/register Register a new user
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiParam {String} name Username.
 * @apiSuccess {String} token JWT token for the user.
 * @apiError (400) {String} message User already exists.
 * @apiError (500) {String} error Server error while registering user.
 */
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

/**
 * @api {post} /auth/login Log in with username
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiParam {String} name Username.
 * @apiSuccess {String} token JWT token for the user.
 * @apiError (400) {String} message Invalid username.
 * @apiError (500) {String} error Server error while logging in.
 */
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
