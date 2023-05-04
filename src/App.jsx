import React, { useState, useEffect } from 'react';
import Header from './Header';
import CreateArea from './CreateArea';
import Note from './Note';

const App = function () {
  const [notes, setNotes] = useState(getInitialNotes());

  function getInitialNotes() {
    const tempNotes = localStorage.getItem('notes');
    const savedNotes = JSON.parse(tempNotes);
    return savedNotes || [];
  }

  useEffect(() => {
    const tempNotes = JSON.stringify(notes);
    localStorage.setItem('notes', tempNotes);
  }, [notes]);

  const addNote = function (newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  };

  const deleteNote = function (id) {
    setNotes(prevNotes => {
      return prevNotes.filter((_, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="container">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
