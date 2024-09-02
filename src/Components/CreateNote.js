import React, { useState } from 'react';
import { createNote } from '../services/api';
import '../styles/CreateNote.css'; 

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
    <div className="form-container">
      <form className="create-note-form" onSubmit={handleSubmit}>
        <h1>Activity Log</h1>
        <input
          type="text"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          placeholder="ID"
          className="form-input"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="form-input"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="form-input"
        />
        <button type="submit" className="submit-button">Create</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default CreateNote;
