const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "First Note",
    important: false,
    date: new Date().toUTCString(),
  },
  {
    id: 2,
    content: "Second Note",
    important: false,
    date: new Date().toUTCString(),
  },
  {
    id: 3,
    content: "Task 1",
    important: false,
    date: new Date().toUTCString(),
  },
];

app.get("/", (request, response) => {
  response.json({
    message: "Home page",
  });
});

app.get("/getAll", (request, response) => {
  response.json(notes);
});

app.get("/getOne/:id", (request, response) => {
  const paramId = +request.params.id;
  const note = notes.find((n) => n.id === paramId);
  if (!note) {
    return response.status(404).json({
      message: "Note not exists",
    });
  }
  return response.json(note);
});

app.delete("/deleteOne/:id", (request, response) => {
  const paramId = +request.params.id;
  const note = notes.find((n) => n.id === paramId);
  if (!note) {
    return response.status(404).json({
      message: "Note not exists",
    });
  }
  const notesAfter = notes.filter((n) => n.id !== paramId);
  notes = notesAfter;
  return response.json(notesAfter);
});

app.post("/create", (request, response) => {
  let newNote = request.body;
  const maxId = Math.max(...notes.map((n) => n.id));
  newNote = {
    ...newNote,
    id: maxId + 1,
    date: new Date().toUTCString(),
  };
  notes = [...notes, newNote];
  response.json({
    message: "Created",
    note: newNote,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Backend running in port " + PORT);
});
