import React from 'react';
import NotesList from './Components/NotesList';
import CreateNote from './Components/CreateNote';
import './styles.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="create-note-section">
        <CreateNote />
      </div>
      <div className="notes-list-section">
        <NotesList />
      </div>
    </div>
  );
};

export default App;
