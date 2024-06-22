import React from 'react'

const NoNotes = () => {
    return (
        <div className='container d-flex align-iteam-center justify-content-center flex-column mt-5' >
            <svg xmlns="http://www.w3.org/2000/svg" height="6em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" /></svg>
            <div className='container d-flex align-iteam-center justify-content-center mt-4'>
                <h1>No Notes</h1>
            </div>

        </div>
    )
}

export default NoNotes
