import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const ArchiveItem = (props) => {
    let context = useContext(noteContext);
 
    const { deleteNote ,getContrastColor} = context;
    const { note, selectNote } = props;
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
            <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#deletePopModal" style={{ color: textColor }}     onClick={() => selectNote(note)}>
            <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ArchiveItem


