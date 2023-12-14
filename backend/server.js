// server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { register, login, authenticate } = require('./controllers/authController');
const { getNotes, createNote, updateNote, deleteNote } = require('./controllers/notesController');
const Note = require('./models/Note');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then((data)=>{
    console.log('database created');
}).catch((err)=>{
    console.log('error occured',err)
})

// API Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Authentication middleware
app.use('/api/notes', authenticate);

// Note-related routes
app.get('/api/notes', getNotes);
app.post('/api/notes', createNote);
app.put('/api/notes/:noteId', updateNote);
app.delete('/api/notes/:noteId', deleteNote);

// Socket.io for Real-time Collaboration
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
