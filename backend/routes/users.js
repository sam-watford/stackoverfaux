const express = require("express");
const { User } = require("../models");
const router = express.Router();

/**
 * @api {get} /users Retrieve all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.id User id.
 * @apiSuccess {String} users.name Username.
 * @apiError (500) {String} error Server error while retrieving users.
 */
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

/**
 * @api {get} /users/:id Retrieve a specific user by id
 * @apiName GetUserById
 * @apiGroup Users
 * @apiParam {Number} id User's unique ID.
 * @apiSuccess {Number} id User id.
 * @apiSuccess {String} name Username.
 * @apiError (404) {String} message User not found.
 * @apiError (500) {String} error Server error while retrieving the user.
 */
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
