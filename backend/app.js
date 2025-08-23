const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect database
connectDB();

// routes
const notesRoutes = require("./routes/notesRoutes");
app.use("/api/notes", notesRoutes);

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todo", todoRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
