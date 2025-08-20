const mongoose = require("mongoose"); 

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  task: [{ type: String, required: true }],
  color: { type: String, default: "#FFFFFF" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);
