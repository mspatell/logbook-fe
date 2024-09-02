import React, { useState } from 'react';
import { createNote } from '../services/api';

const CreateNote = () => {
  const [noteId, setNoteId] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createNote({ noteId, content, author });
      setNoteId('');
      setContent('');
      setAuthor('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to create note');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Activity Log</h1>
      <input
        type="text"
        value={noteId}
        onChange={(e) => setNoteId(e.target.value)}
        placeholder="ID"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <button type="submit">Create</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default CreateNote;
