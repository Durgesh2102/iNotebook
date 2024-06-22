import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import backgroundImage from './image/notebook-blur.png'
import noteContext from '../context/notes/noteContext';
import ArchiveItem from './ArchiveItem';
import NoNotes from './NoNotes';
import DeletePop from './DeletePop';
import Alert from './Alert';
const Archive = (props) => {
  const navigate = useNavigate();
  let context = useContext(noteContext)

  const { notes, fetchNote } = context;
  const notesInitial = [];

  const [NotesArch, setNotesArch] = useState(notesInitial)

  const [selectedNote, setSelectedNote] = useState(null)
  const selectNote = (note) => {
    setSelectedNote(note)
  }
  const fetchArchive = () => {
    const newNote = notes.filter(note => note.Archive === "true");
    setNotesArch(newNote);
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNote();
      fetchArchive()
    }
    else {
      navigate("/logIn")

    }

  }, [notes])

  return (
    <>
      <div style={{

        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Navbar />
        <Alert />
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {NotesArch.length > 0 ? (
            NotesArch.map((note) => (
              <ArchiveItem key={note._id} note={note} selectNote={selectNote} />
            ))
          ) : (
            <NoNotes />
          )}
        </div>
      </div>
      <DeletePop  noteData={selectedNote}/>
    </>
  );
};

export default Archive;
