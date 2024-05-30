import React from 'react';
import NotesList from './NotesList';
import CreateNote from './CreateNote';
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
