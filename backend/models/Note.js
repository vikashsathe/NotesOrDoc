// models/Note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }  // ✅ auto-save date
});

module.exports = mongoose.model("Note", noteSchema);
