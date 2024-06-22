import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import './Noteitem.css';

const NoteIteam = (props) => {
  let context = useContext(noteContext);
  const { deleteNote ,updateNote,showAlert,getContrastColor} = context;
  const { note, selectNote } = props;

  const goArchive=()=>{
    let Archive="true"
    updateNote(note._id, note.title, note.description,Archive) 
    showAlert("added to the Archive","sucesfully")
}
 
  const backgroundColor = note && note.color ? note.color : '#ffffff';
  const textColor = getContrastColor(backgroundColor);

  return (
    <>
      {note && (
        <div
          className="card"
          style={{
         
            overflow: 'hidden',
            width: '266px',
            margin: '10px',
            backgroundColor,
            // background color of the card is comming from the note.color and the card text color is set by the textcolor
            color: textColor,
          }}
        >
          <div className="card-header">
            <h5 className="card-title">{note.title}</h5>
          </div>
          <div className="card-body">
            <p className="card-text">{note.description}</p>
          </div>
          <div className="footer d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-link btn-hidden"
              onClick={() => selectNote(note)}
              data-bs-toggle="modal"
              data-bs-target="#centerModal"
              style={{ color: textColor }}
            >
              <i className="fa-solid fa-book-open"></i>
            </button>

            <button
              type="button"
              className="btn btn-sm btn-link btn-hidden"
              onClick={() => selectNote(note)}
              data-bs-toggle="modal"
              data-bs-target="#updateNotesModal"
              style={{ color: textColor }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>

            {/* <button
              type="button"
              className="btn btn-sm btn-link btn-hidden"
              onClick={() => deleteNote(note._id)}
              style={{ color: textColor }}
            >
               <i className="fa-solid fa-trash"></i>
            </button> */}

           
            <button type="button" class="btn " onClick={()=>goArchive()} style={{ color: textColor }}>
            <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteIteam;
