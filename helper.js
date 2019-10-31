const Note = require("./model/Note");

const getDataById = async (req, res, next) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ error: "Cannot find data." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }

  res.note = note;
  next();
};

module.exports = getDataById;
