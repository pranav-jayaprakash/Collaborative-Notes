import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote, deleteNote } from '../redux/notesSlice';
import axios from 'axios';

const NoteItem = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdateNote = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/notes/${note._id}`,
        { title: updatedTitle, content: updatedContent },
        { headers: { Authorization: token } }
      );
      dispatch(updateNote(response.data.note));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${note._id}`, {
        headers: { Authorization: token },
      });
      dispatch(deleteNote(note._id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <label>Title: </label>
          <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          <br />
          <label>Content: </label>
          <textarea value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} />
          <br />
          <button onClick={handleUpdateNote}>Update</button>
        </div>
      ) : (
        <div>
          <strong>{note.title}</strong>
          <p>{note.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteNote}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
