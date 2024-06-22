import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteIteam from './NoteIteam';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import RightSideBar from './note/RightSideBar';
import axios from 'axios';
import ModalBrowser from './profile Modal/ModalBrowser';

const Notes = (props) => {
  const { noteData } = props
  let context = useContext(noteContext)
  const { notes, fetchNote, updateNote, showAlert, user, getUser } = context;

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })  //this state is for the modal data 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/")

    } else {

    }

  }, []);


  const newNote = [{
    name: "new notes",
    description: "this is my notes",
    tag: "persnoal"
  }]

  const ref = useRef(null)
  const refClose = useRef(null)

  // eslint-disable-next-line
  if (noteData) {
    setNote({ id: noteData._id, etitle: noteData.title, edescription: noteData.description, etag: noteData.tag })
  }




  const handleClick = (e) => {

    e.preventDefault()  //privent the rerendaring the form 
    updateNote(note.id, note.etitle, note.edescription, note.etag)  //updating the note in the database
    refClose.current.click()
    showAlert("update sucessfull", "success");
  }
  const change = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='d-flex align-items-center  justify-content-center'>

        {/* <AddNote /> */}

      </div>
      <div>
        <div className='container bg-dark' style={{ backgroundColor: '#f4d6b4', border: "#f4d6b4" }}>

          {/* <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">iNoteBook</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* ADDING THE FORM HERE  */}
                  <div className="container my-3">
                    <h1>UPDATE NOTE</h1>
                    <form className=''>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="email" className="form-control" id="etitle" aria-describedby="etitleHelp" value={note.etitle} name='etitle' onChange={change} minLength={5} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={change} minLength={5} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">tag</label>
                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={change} />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary  bg-dark border-dark " onClick={handleClick}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Notes
