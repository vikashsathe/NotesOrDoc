const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/auth");

// POST -> Add new todo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, task, color } = req.body;
    const newTodo = new Todo({ title, task, color, userId: req.user._id });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to save todo" });
  }
});

// GET -> Fetch todos
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// DELETE -> Delete todo
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.userId.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    await todo.deleteOne();
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT -> Update todo
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.userId.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    const { title, task, color } = req.body;
    todo.title = title || todo.title;
    todo.task = task || todo.task;
    todo.color = color || todo.color;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
