const express = require("express");
const notesRouter = require("./routes/notes");
const connectToDB = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

//db connection
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api/notes", notesRouter);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
