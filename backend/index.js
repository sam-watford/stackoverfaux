// backend/index.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const dotenv = require("dotenv");

const questionsRouter = require("./routes/questions");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const answersRouter = require("./routes/answers");
const authRouter = require("./routes/auth");

// Load environment variables from .env file
dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Test the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Enable CORS for all routes (you can customize this later)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Routes
app.use("/questions", questionsRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);
app.use("/answers", answersRouter);
app.use("/auth", authRouter);

// Sync database models with better logging and error handling
sequelize
  .sync({ alter: true }) // Use { alter: true } to automatically update tables without dropping them
  .then(() => {
    console.log("Database synchronized successfully");
    // Start the server once the database is synchronized
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });
