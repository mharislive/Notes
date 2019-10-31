const express = require("express");
const Note = require("../model/Note");
const getDataById = require("../helper");

const router = express.Router();

//get all notes (search)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({});
    if (notes.length > 0) {
      return res.status(200).json({ data: notes, error: null });
    }
    return res.status(200).json({ error: "No data found." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//get note
router.get("/:id", getDataById, async (req, res) => {
  res.status(200).json({ data: res.note, error: null });
});

//create note
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    if (title) {
      const note = new Note({ title: req.body.title });
      await note.save();
      return res.status(200).json({ data: note, error: null });
    }
    return res.status(400).json({ error: "Please enter a note." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//update note
router.patch("/:id", getDataById, async (req, res) => {
  //validation
  const title = req.body.title;
  if (title) {
    res.note.title = title;
  } else {
    return res.status(400).json({ error: "Please enter a note." });
  }

  //saving
  try {
    await res.note.save();
    return res.status(200).json({ data: res.note, error: null });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

//delete note
router.delete("/:id", getDataById, async (req, res) => {
  try {
    const note = res.note;
    await res.note.remove();
    return res.status(200).json({ data: note, error: null });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
