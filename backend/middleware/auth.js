const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  // Ensure token follows the Bearer format
  const bearerToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user (userId) to the request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
