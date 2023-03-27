import React, {useState} from "react";
import NotesOverviewEdu from "./renderAddNote";


const Educational = (props) => {

  const eduEditTrueOrFalse = props.eduEditTrueOrFalse 
  // this is a simple form with three inputs and a way to bulletpoints to your 'segment'.
  // the bulletpoints are added with the component NotesOverviewEdu. This component renders a default text 'Bulletpoint' with a textArea to add your bulletpoint.
  // when the user chooses to edit, the bulletpoints and the school name, study name and date of study are displayed on the textArea. 
  // depending on if the user is editing a bulletpoint or adding a new bulletpoints, the button changes from 'bewerk' or 'opslaan'
  // this button is conditionally rendered based on the state eduEditTrueOrFalse. 

    return <>
            <form className="educational" onSubmit={props.test}>
            <label htmlFor="schoolInput">Schoolnaam</label>
            <input
              required
              onChange={props.school}
              value={props.schoolValue}
              type="text"
              id="schoolInput"
            />
            <label htmlFor="studyInput">Opleiding</label>
            <input
              required
              onChange={props.study}
              value={props.studyValue}
              type="text"
              id="studyInput"            
            />
            <label htmlFor="dateInput">Begin- en einddatum</label>
            <input
              required
              onChange={props.date}
              value={props.dateValue}
              type="text"
              id="dateInput"            
            />
            <NotesOverviewEdu notes={props.notes} handleNoteChange={props.handleNoteChange} />
            <button type="button" onClick={props.addNote} className='middleButton'>Voeg bulletpoint toe</button>
            <button type="button" onClick={props.deleteNote} className='middleButton'>Verwijder bulletpoint</button>
            {eduEditTrueOrFalse ? <button type="button" onClick={props.handleEditChanges} className='middleButton'>Bewerken</button> : <button onClick={props.submit} type="button" className='middleButton'>Opslaan</button>}
            
            

            
        </form>
    </>
}

export default Educational;