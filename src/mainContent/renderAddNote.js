import React, {useState} from "react";

// this component renders a label and textArea when the user clicks on 'add note'.

const NotesOverviewEdu = (props) => {
    const notes = props.notes
    const handleNoteChange = props.handleNoteChange

    const updatedNotes = notes.map((note, index) => {


        
        return <div key={index} className="note">
            <label htmlFor="noteInput" >Bulletpoint:</label>
            <textarea
            onChange={(data) => handleNoteChange(data, index)}
            value={notes[index].note}
            type='text'
            id='noteInput'
            className="noteInput"
            />
        </div>
    }) 

    return (
        <div>
            {updatedNotes}
        </div>
    )
}






export default NotesOverviewEdu;