const mongoose = require("mongoose");

const connectToDB = async () => {
  const uri = "mongodb://localhost:27017/notesdb";

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`DB connected successfully...`);
  } catch (err) {
    console.log(`DB error: ${err}`);
  }
};

module.exports = connectToDB;
