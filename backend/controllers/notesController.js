// controllers/notesController.js
const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ collaborators: req.username });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createNote = async (req, res) => {
  console.log(req.body.title,'backend data recieved')
  try {
    const title = req.body.title;
    const content = req.body.content;
    console.log(title,content, "got data")

    // Create a new note
    const newNote = new Note({
      title,
      content,
      collaborators: [req.username],
    });

    // Save the note to the database
    await newNote.save();

    

    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const title = req.body.title;
    const content = req.body.content;
    console.log(title,content, "got data")

    // Find the note in the database
    const note = await Note.findById(noteId);

    // Check if the user is a collaborator on the note
    if (!note.collaborators.includes(req.username)) {
      return res.status(403).json({ message: 'Access denied. You are not a collaborator on this note.' });
    }

    // Update the note
    note.title = title;
    note.content = content;

    // Save the updated note to the database
    await note.save();

    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    // Find the note in the database
    const note = await Note.findById(noteId);

    // Check if the user is a collaborator on the note
    if (!note.collaborators.includes(req.username)) {
      return res.status(403).json({ message: 'Access denied. You are not a collaborator on this note.' });
    }

    // Delete the note
    await note.deleteOne();

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
