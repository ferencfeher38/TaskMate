import React, { useState, useEffect } from 'react';
import Header from './Header';
import CreateArea from './CreateArea';
import Note from './Note';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

const App = function () {
  const [notes, setNotes] = useState(getInitialNotes());

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#675D50',
      },
      divider: '#000',
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      text: {
        primary: '#675D50',
      },
      background: {
        default: '#ede4e0',
      },
    },
  });

  const [theme, setTheme] = useState('light');

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

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <div>
        <Header />
        <div className="container theme-mode-icon">
          <IconButton onClick={toggleTheme}>
            {theme === 'light' ? (
              <Brightness7Icon sx={{ fontSize: 40 }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: 40 }} />
            )}
          </IconButton>
        </div>
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
    </ThemeProvider>
  );
};

export default App;
