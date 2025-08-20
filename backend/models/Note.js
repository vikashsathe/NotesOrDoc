const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, default: "#3F3F47" }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true }); 

module.exports = mongoose.model("Note", noteSchema);
