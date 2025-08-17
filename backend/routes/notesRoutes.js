const express = require("express");
const router = express.Router();
const Note = require("../models/Note"); // make sure Note model exists

// POST -> Save new note
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

// GET -> Fetch all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

module.exports = router;
