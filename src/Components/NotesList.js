import React, { useState, useEffect } from 'react';
import { getNotes, deleteNote } from '../services/api';
import UpdateNote from './UpdateNote';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      console.log('Fetched Notes:', fetchedNotes);
      if (Array.isArray(fetchedNotes)) {
        setNotes(fetchedNotes);
      } else {
        setNotes([]);
        setError('Failed to retrieve notes. Please try again.');
      }
    } catch (err) {
      setError('Error fetching notes. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes(); // Refresh the list after deleting a note
    } catch (err) {
      setError('Error deleting note. Please try again.');
      console.error(err);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleCloseEdit = () => {
    setEditingNote(null);
  };

  return (
    <div>
      <h1>Logs</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.noteId}>
              {note.content}
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note.noteId)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </ul>
      {editingNote && (
        <UpdateNote
          noteId={editingNote.noteId}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default NotesList;
