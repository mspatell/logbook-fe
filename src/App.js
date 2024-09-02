import React from 'react';
import NotesList from './Components/NotesList';
import CreateNote from './Components/CreateNote';
import './styles.css';

const App = () => {
  return (
    <div>
      <CreateNote />
      <NotesList />
    </div>
  );
};

export default App;
