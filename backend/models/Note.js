// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  collaborators: [{ type: String }],
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
