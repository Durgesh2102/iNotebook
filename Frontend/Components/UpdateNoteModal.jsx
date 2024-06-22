import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'

const UpdateNoteModal = (props) => {
    const { noteData } = props
    let context = useContext(noteContext)
    const { updateNote, showAlert } = context;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })  //this state is for the modal data 
    const navigate = useNavigate();

    useEffect(() => {
        if (noteData) {
            setNote({ id: noteData._id, etitle: noteData.title, edescription: noteData.description, etag: noteData.tag })

        }
        if (localStorage.getItem('token')) {
            navigate("/")

        } else {

        }

    }, [noteData]);
    const handleClick = (e) => {

        e.preventDefault()  //privent the rerendaring the form 
        updateNote(note.id, note.etitle, note.edescription, note.etag)  //updating the note in the database

        showAlert("update sucessfull", "success");
    }
    const change = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const getContrastColor = (hexColor) => {
        if (!hexColor || hexColor.length !== 7 || hexColor[0] !== '#') {
            // If hexColor is not valid, return default text color
            return '#000';
        }

        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        return luminance > 0.5 ? '#000' : '#fff';
    };

    const backgroundColor = noteData ? noteData.color : "#FFFFFF"; // Use a default color value
    const textColor = getContrastColor(backgroundColor);


    return (
        <div>

            <div className="modal fade" id="updateNotesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{backdropFilter: 'blur(5px)'}}>
                <div className="modal-dialog">
                    <div className="modal-content" style={{
                        backgroundColor,
                        color: textColor
                    }} >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">UPDATE NOTE</h1>

                            <button type="button" className="btn btn-close me-2" data-bs-dismiss="modal" aria-label="Close" style={{ color: textColor }}>
                            {/* <i class="fa-solid fa-xmark fa-lg"></i> */}
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form className=''>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                        <input type="email" className="form-control" id="etitle" aria-describedby="etitleHelp" value={note.etitle} name='etitle' onChange={change} minLength={5} required />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={change} minLength={5} required />
                                    </div> */}
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                                        <textarea className="text rounded  col-md-12" aria-label="With textarea" id="edescription" value={note.edescription} name='edescription' onChange={change} minLength={5} required ></textarea>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-bs-dismiss="modal" onClick={handleClick} style={{ color: textColor }} ><i className="fa-solid fa-floppy-disk fa-lg"></i></button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateNoteModal
