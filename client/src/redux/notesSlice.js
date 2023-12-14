// src/redux/notesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: { notes: [] },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const updatedNote = action.payload;
      const index = state.notes.findIndex((note) => note._id === updatedNote._id);
      if (index !== -1) {
        state.notes[index] = updatedNote;
      }
    },
    deleteNote: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note._id !== noteId);
    },
  },
});

export const { setNotes, addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
