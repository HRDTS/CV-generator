import React from "react"

// this is where the segments are rendered based on the state proTasks.
// it parses through each element and grabs the bulletpoints, company name, role and date of work.
// it also adds a delete and edit button so the user can later delete/edit that segment.
// the bulletpoints require their own map method, since there are multiple bulletpoints stored in an array

const OverviewPro = (props) => {

    const tasks = props.tasks
    const handleRemove = props.handleRemove
    const handleEdit = props.handleEdit
    const hideDeleteEdit = props.hideDeleteEdit
    function reverseString(dateStr) {
        if (dateStr != '') {
            const parts = dateStr.split('-');
            return parts[2] + '-' + parts[1] + '-' + parts[0];
        } else {
            return ''
        }
      }


    const updatedTasks = tasks.map((task, index) => {

        function NoteList(props) {
            const notes = task.notes
            const noteItems = notes.map((element, index) => {
                return <li key={element.id}>{element.note}</li> 
            })
            return (
                <ul key={index}>
                    {noteItems}
                </ul>
            )
        }

        return <div key={index} className="segment">
            <div className="headerOfDiv">
            <div className="upperPartProfessional">
                <div className="innerDiv1"><b>{task.company} </b></div>
                <div className="innerDiv2"><b>{task.position}</b></div>
                <div className="innerDiv3"><b>{reverseString(task.dateStart)} {reverseString(task.dateEnd)}</b></div>
                <div className="buttons">
                <button style={hideDeleteEdit ? {display: 'none'} : {display: 'block'}} className="deleteButton" onClick={() => handleRemove(task.id)} >delete</button>
                <button style={hideDeleteEdit ? {display: 'none'} : {display: 'block'}} className="editButton" onClick={() => handleEdit(task.id)} >edit</button>
            </div>
            </div>

            <div><NoteList/></div>


        </div>
        </div>


    })

    return (
        <div>
            {updatedTasks}
        </div>
    )
}

export default OverviewPro