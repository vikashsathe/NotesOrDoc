const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const authMiddleware = require("../middleware/auth");

// POST -> Save new note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({ title, description, userId: req.user._id });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

// GET -> Fetch notes of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// DELETE -> Delete a note by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.userId.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // PUT -> Update a note by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.userId.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    const { title, description, color } = req.body; 

    note.title = title || note.title;
    note.description = description || note.description;
    note.color = color || note.color; 

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

