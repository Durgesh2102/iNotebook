import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const DeletePop = ({ noteData }) => {
    let context = useContext(noteContext);
    const { deleteNote, getContrastColor,updateNote,showAlert } = context;
    const backgroundColor = noteData && noteData.color ? noteData.color : '#ffffff';
    const textColor = getContrastColor(backgroundColor);
    const restore=()=>{
        let Archive="false"
        updateNote(noteData._id, noteData.title, noteData.description,Archive) 
        showAlert("restore sucessfully","sucess")
    }
    return (
        <div>
            <div class="modal fade" id="deletePopModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{backdropFilter: 'blur(5px)'}}>
                <div class="modal-dialog ">
                    <div class="modal-content " style={{
                        width: '266px',
                        margin: '10px',
                        backgroundColor,
                        color: textColor,
                        // backdropFilter: 'blur(15px)', // Apply backdrop blur
                    }}>
                        <div class="modal-body">
                            <p>Do you want to delete permanantly?</p>
                        </div>
                        <div class="footer d-flex align-iteam-center justify-content-end">
                            <button type="button" class="btn" data-bs-dismiss="modal"><i class="fa-solid fa-rotate-left" onClick={()=>restore()} style={{ color: textColor }}></i></button>
                            <button type="button" class="btn" data-bs-dismiss="modal" onClick={() => deleteNote(noteData._id)} style={{ color: textColor }}>  <i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePop;
