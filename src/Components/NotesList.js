import React, { useState, useEffect } from 'react';
import { getNotes, deleteNote, updateNoteStrikeThrough } from '../services/api';
import UpdateNote from './UpdateNote';
import '../styles/NotesList.css';

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

  const handleStrikeThrough = async (id) => {
    try {
      // Find the note to update
      const updatedNotes = notes.map(note => 
        note.noteId === id 
          ? { ...note, strikethrough: !note.strikethrough } 
          : note
      );
      
      setNotes(updatedNotes); // Update UI immediately

      // Send the update to the server
      await updateNoteStrikeThrough(id, !notes.find(note => note.noteId === id).strikethrough);
    } catch (err) {
      setError('Error updating note. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Logs</h1>
      {error && <p className="error">{error}</p>}
      <table className="notes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note) => (
              <tr key={note.noteId} className={note.strikethrough ? 'strikethrough' : ''}>
                <td>{note.noteId}</td>
                <td>{note.content}</td>
                <td>{note.author}</td>
                <td>
                  <button onClick={() => handleEdit(note)}>Edit</button>
                  <button onClick={() => handleDelete(note.noteId)}>Delete</button>
                  <button onClick={() => handleStrikeThrough(note.noteId)}>Toggle Strike-through</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No notes available.</td>
            </tr>
          )}
        </tbody>
      </table>
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
