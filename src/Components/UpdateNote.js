import React, { useState, useEffect } from 'react';
import { getNote, updateNote } from '../services/api';

const UpdateNote = ({ noteId, onClose }) => {
  const [noteContent, setNoteContent] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await getNote(noteId);
        setNoteContent(note.content || '');
        setNoteAuthor(note.author || '');
      } catch (err) {
        console.error('Error fetching note:', err);
        setError('Failed to fetch note details');
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateNote(noteId, { content: noteContent, author: noteAuthor });
      setNoteContent('');
      setNoteAuthor('');
      setError(null);
      onClose(); // Close the form after successful update
    } catch (err) {
      console.error('Error updating note:', err);
      setError('Failed to update note');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Note</h1>
      <input
        type="text"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Content"
      />
      <input
        type="text"
        value={noteAuthor}
        onChange={(e) => setNoteAuthor(e.target.value)}
        placeholder="Author"
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Cancel</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UpdateNote;
