// routes/notes.js
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authController = require('../controllers/authController');

// Authentication middleware
router.use(authController.authenticate);

router.get('/', notesController.getNotes);
router.post('/', notesController.createNote);
router.put('/:noteId', notesController.updateNote);
router.delete('/:noteId', notesController.deleteNote);

module.exports = router;
