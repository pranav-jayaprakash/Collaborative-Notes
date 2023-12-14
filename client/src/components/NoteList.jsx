// src/components/NoteList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../redux/notesSlice';
import NoteItem from './NoteItem';
import axios from 'axios';

const NoteList = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes', {
          headers: { Authorization: token },
        });
        dispatch(setNotes(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    if (user && token) {
      fetchNotes();
    }
  }, [user, token, dispatch]);

  return (
    <div>
      <h2>Your Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <NoteItem note={note} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
