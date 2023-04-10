import React, {useState} from "react";
import NotesOverviewPro from "./renderAddNotePro";

const Professional = (props) => {

    const proEditTrueOrFalse = props.proEditTrueOrFalse
      // this is a simple form with three inputs and a way to bulletpoints to your 'segment'.
  // the bulletpoints are added with the component NotesOverviewPro. This component renders a default text 'Bulletpoint' with a textArea to add your bulletpoint.
  // when the user chooses to edit, the bulletpoints and the companyn name, role and date of work are displayed on the textArea. 
  // depending on if the user is editing a bulletpoint or adding a new bulletpoints, the button changes from 'bewerk' or 'opslaan'
  // this button is conditionally rendered based on the state eduEditTrueOrFalse. 

    return<>
        <form className="professional" >
            <label htmlFor="companyInput">Bedrijfsnaam</label>
            <input
              required
              onChange={props.company}
              value={props.companyValue}
              type="text"
              id="companyInput"
            />
            <label htmlFor="positionInput">Functie</label>
            <input
              required
              onChange={props.position}
              value={props.positionValue}
              type="text"
              id="positionInput"            
            />
            <label htmlFor="dateInput">Begindatum</label>
            <input
              required
              onChange={props.dateStart}
              value={props.dateValueStart}
              type='date'
              id="dateInputBegin"            
            />
            <label htmlFor="dateInput">Einddatum</label>
            <input
              required
              onChange={props.dateEnd}
              value={props.dateValueEnd}
              type='date'
              id="dateInput"            
            />             
            <NotesOverviewPro notes={props.notes} handleNoteChange={props.handleNoteChangePro} />
            <button type="button" onClick={props.addNote} className='middleButton'>Voeg bulletpoint toe</button>
            <button type="button" onClick={props.deleteNotePro} className='middleButton'>Verwijder bulletpoint</button>
            {proEditTrueOrFalse ? <button type="button" onClick={props.handleEditChanges} className='middleButton'>Bewerk</button> :<button type="button" onClick={props.submit} className='middleButton'>Opslaan</button>}
        </form>
    </>
}

export default Professional