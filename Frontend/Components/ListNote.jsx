import React, { useContext, useEffect, useState } from 'react'
import NoteIteam from './NoteIteam';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import './Noteitem.css';
import UpdateNoteModal from './UpdateNoteModal';
import CenterModal from './note/CenterModal';
import NoNotes from './NoNotes';
import DeletePop from './DeletePop';

const ListNote = (props) => {
  let context = useContext(noteContext)
  const notesInitial = [];
  const[NotesWihoutArchive,setNotesWihoutArchive]=useState(notesInitial)
  const { notes, fetchNote } = context;
  let navigate = useNavigate()

  const [selectedNote, setSelectedNote] = useState(null)
  const fetchWithoutArchive=()=>{
    const newNote = notes.filter(note => note.Archive=="false");
    setNotesWihoutArchive(newNote);
   }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('inside the fectch notes ');
      fetchNote();
      fetchWithoutArchive(); 
    }
    else {
      navigate("/logIn")

    }

  }, [notes?.length])
  const selectNote = (note) => {
    setSelectedNote(note)
  }
  return (
    <>
      <div style={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {NotesWihoutArchive.length > 0 ?  (
          NotesWihoutArchive.map((note) => (
            <NoteIteam key={note._id} note={note} selectNote={selectNote} />
          ))
        ) : (
          <NoNotes/>
        )}
      </div>
      
      <UpdateNoteModal noteData={selectedNote} />
      <CenterModal noteData={selectedNote} />
     
    </>

  )
}

export default ListNote
