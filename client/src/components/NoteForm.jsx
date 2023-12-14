import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../redux/notesSlice';
import axios from 'axios';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleCreateNote = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/notes',
        { title, content },
        { headers: { Authorization: token } }
      );
      dispatch(addNote(response.data.note));
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create a Note</h2>
      <label>Title: </label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Content: </label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button onClick={handleCreateNote}>Create Note</button>
    </div>
  );
};

export default NoteForm;
