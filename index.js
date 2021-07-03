const express = require("express");
const app = express();
const cors = require("cors");
const { Note } = require("./models/Note");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const notes = [];

app.get("/", (request, response) => {
  response.json({
    message: "Home page",
  });
});

app.get("/getAll", async (request, response) => {
  try {
    const result = await Note.find({});
    response.json(result);
  } catch (err) {
    return response.status(500).json({
      message: err,
    });
  }
});

app.get("/getOne/:id", async (request, response) => {
  const paramId = request.params.id;
  try {
    const note = await Note.findById(paramId);
    if (!note) {
      return response.status(404).json({
        message: "Note with that id does not exists",
      });
    }
    return response.json(note);
  } catch (err) {
    return response.status(500).json({
      message: err,
    });
  }
});

app.delete("/deleteOne/:id", async (request, response) => {
  const paramId = request.params.id;
  try{
    const note = await Note.findByIdAndDelete(paramId)
    if (!note) {
      return response.status(404).json({
        message: "Note with that id does not exists",
      });
    }
    return response.json(note)
  }catch(err){
    console.log(err)
    response.status(500).json({
      message: err
    })
  }
});

app.post("/create", async (request, response) => {
  let newNote = request.body;
  const note = new Note({
    content: newNote.content,
    important: newNote.important,
    date: new Date(),
  });
  try {
    const res = await note.save();
    return response.json(res)
  } catch (err) {
    return response.status(500).json({
      message: "",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Backend running in port " + PORT);
});
