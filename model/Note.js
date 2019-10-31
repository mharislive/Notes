const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", noteSchema);
