import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  let Navigate = useNavigate();
  let context = useContext(noteContext)
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description,Archive="false")
    setNote({ title: "", description: "", tag: "" })
  }
  const change = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const containerStyle = {
    backgroundColor: '#f8f4f1',
    // To make sure the background color covers the entire viewport height
  };
  const logOutHandler = () => {
    localStorage.setItem("token", "")
    Navigate("/login")
    //clear the token data
    // window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");

  }
  return (
    <>
      <div className='col-md-8 d-flex align-items-center  justify-content-center flex-column' >
        <h1>Add a Notes</h1>
        <div className=" my-3 col-md-10 rounded  py-5 mt-2  ">

          <form className='container col-md-10 d-flex align-items-center  justify-content-center flex-column'>
            <div className="col-md-10">
              <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
              <input type="email" className="form-control col-md-10" id="title" aria-describedby="titleHelp" name='title' value={note.title} onChange={change} minLength={5} required />
            </div>
            <div className="col-md-10">
              <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
              <input type="text" className="form-control col-md-10" id="description" name='description' value={note.description} onChange={change} minLength={5} required />
            </div>
            <div className="col-md-10 mb-4">
              <label htmlFor="exampleInputTag" className="form-label">tag</label>
              <input type="text" className="form-control col-md-10" id="tag" name='tag' value={note.tag} onChange={change} />
            </div>
            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-warning " onClick={handleClick}>ADD NOTE</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default AddNote
