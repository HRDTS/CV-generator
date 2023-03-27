import React, {useEffect, useState, useRef} from "react";
import uniqid from "uniqid";
import Educational from "../mainContent/educational";
import Personal from "../sidebarContent/personal";
import OverviewEdu from "../mainContent/overviewEdu";
import Professional from "../mainContent/professional";
import OverviewPro from "../mainContent/overviewPro";
import Profile from "../mainContent/profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCar, faCircle, faEnvelope, faLocationDot, faPhone,} from '@fortawesome/free-solid-svg-icons'
import { Rating } from "../ratingCircles";
import Vaardigheden from "../sidebarContent/vaardigheden";
import Talen from "../sidebarContent/talen";
import { Koppelteken, Wordbreak, HeaderColor, FirstLineColor, SecondLineColor, LetterGrootteMainContent, LetterGrootteSidebar } from "../stylingFeatures/stylingFeatures";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/*
This file contains all the states necessary for changing the content on the CV, from the main content (profile, work and education) all the way to the sidebarContent(personalia, skills and languages)
So this file serves as a central 'coordinating' part of the cv application. All the states need to be 'changed', with change I mean add, edit or remove. All the functions for those three (add, edit and remove) are also
written in this file. The form inputs where I let the users write their own inputs are located in their own components. So the form input for the 'educational' segment is located in educational.js.
To this component/file, I will pass the appropriate function to change the 'education' state. 
*/

const Parent = () => {

    //capture is the function that allows the user to download the CV in PDF format.
     function capture(){ // I am using an A4 size html element in my DOM (this is the CV). I am taking a screenshot of that A4 element with the library html2canvas, and that screenshot is downloaded with the library jspdf.
        setHideDeleteEdit(true) // the CV has edit and delete buttons on it which the user does not need on the real CV, so I change the state here. This state change will put the display of edit/delete buttons to 'none'

        const stylingDelay = ms => new Promise(resolve => setTimeout(resolve, ms)); // I put a 0.5 second delay to give the program the time to turn the display of the delete/edit buttons to none. 

        stylingDelay(500).then(() => {
        const captureElement = document.getElementById('capture')
        let previousScale = captureElement.style.scale
        captureElement.style.scale = 1
        html2canvas(captureElement, {scale:1}).then(canvas => {
            canvas.style.display = 'none'
           document.body.appendChild(canvas);
           return canvas
        })
        .then(canvas => {
            const image = canvas.toDataURL('image/png')
            var doc = new jsPDF('p', 'mm', 'a4');
            doc.addImage(image, 'png', 0, 0)
            doc.save(`Curriculum Vitae - ${personal.name}.pdf`)
        }).then(() => {
            captureElement.style.scale = previousScale
        })
        })


     }

     // the next refs and four useStates are for styling the CV.
     const adresRef = useRef()
     const telephoneRef = useRef()
     const emailRef = useRef()
     const geboortedatumRef = useRef()
     const rijbewijsRef = useRef()

     const kopstukRef = useRef()
     const lijn1Ref = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef()
     ]
     const lijn2Ref = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef()
     ]

     const hideRef = useRef()

     const [fontSize, setFontSize] = useState('15px')
     const [kopstuk, setKopstuk] = useState('#363C48')
     const [lijn1, setLijn1] = useState('#e36b08')
     const [lijn2, setLijn2] = useState('#c5d8f0')

     // these two states are connected to inline styling so I can hide the CV(with the hideRender state) and hide the delete/edit buttons on the CV (with the hideDeleteEdit)
     const [hideRender, setHideRender] = useState(false)
     const [hideDeleteEdit, setHideDeleteEdit] = useState(false)

     //here are all the states located that trigger the changes on the CV.
    const [personal, setPersonal] = useState({name:'', email:'', phone:'', city:'', birthDate: '', car: ''})


    const [vaardigheden, setVaardigheden] = useState({een: 'vaardigheid 1', twee: '', drie: '', vier: '', vijf: ''})
    const [vaardighedenRating, setVaardighedenRating] = useState({een: 0, twee: '', drie: '', vier: '', vijf: ''})


    const [talen, setTalen] = useState({een: 'taal 1', twee: '', drie: '', vier: '', vijf: ''})
    const [talenRating, setTalenRating] = useState({een: 'moedertaal', twee: '', drie: '', vier: '', vijf: ''})


    const [profile, setProfile] = useState({description: ''})

     // The educational segment works with bulletpoints which requires a different approach than simply overwritting a state.
     // I need to let the user add, remove and edit a specific state. When the user wants to add something, this state is added to eduTask as a placeholder.
     // When the user submits the content he/she wrote, it will be added (read: pushed) to the eduTasks (with an s at the end) array. 
     // This eduTasks array contains all the bulletpoints that will be rendered. All the bulletpoints are called 'notes' in this project, but I will continue my explanation by refering to them as bulletpoints.
     // I render the bulletpoints by mapping through them in the components: OverviewPro and OverviewEdu.
     // The user is also able to select a bulletpoint either to delete or edit. I achieve this by adding a delete/edit button when mapping through the bulletpoints.
     // I save the unique ID on this button and when the user for example wants to delete a bulletpoint, a function is called to parse through the eduTasks for a bulletpoint with that specific ID.
     // The same method is used for the 'professional' segment below with the proTask and proTasks (with an s at the end)
    const [eduTask, setEduTask] = useState({school: '', study: '', date: '', notes: [], id: uniqid()})
    const [eduTasks, setEduTasks] = useState([])
    const [eduSelectedTask, setEduSelectedTask] = useState('')
    const [eduEditTrueOrFalse, setEduEditTrueOrFalse] = useState(false)


    const [proTask, setProTask] = useState({company:'', position:'', notes: [], date:'', id: uniqid()})
    const [proTasks, setProTasks] = useState([])
    const [proSelectedTask, setProSelectedTask] = useState('')
    const [proEditTrueOrFalse, setProEditTrueOrFalse] = useState(false)

    // This state is used to check if the A4 page is overflowing (this can happen if the user puts too many bulletpoints for an A4 page).
    // There is a function called 'checkHeight' to look for any overflow. If so, this state turns to true and a notification is given to the user.
    const [hasOverflow, setHasOverflow] = useState(false)
    
    // all the functions below update the state either directly or in the case of 'educational' and 'professional' segments, by the method I described above.
    //personal
    function personalName (data) {
        setPersonal({...personal, name: data.target.value})
    }

    function personalEmail (data) {
        setPersonal({...personal, email: data.target.value})
    }

    function personalPhone (data) {
        setPersonal({...personal, phone: data.target.value})
    }

    function personalCity (data) {
        setPersonal({...personal, city: data.target.value})
    }

    function personalBirthDate (data) {
        setPersonal({...personal, birthDate: data.target.value})
    }

    function personalCar (data) {
        setPersonal({...personal, car: data.target.value})
    }

    //vaardigheden
    function vaardigheidEen (data) {
        setVaardigheden({...vaardigheden, een: data.target.value})
    }

    function vaardigheidTwee (data) {
        setVaardigheden({...vaardigheden, twee: data.target.value})
    }

    function vaardigheidDrie (data) {
        setVaardigheden({...vaardigheden, drie: data.target.value})
    }

    function vaardigheidVier (data) {
        setVaardigheden({...vaardigheden, vier: data.target.value})
    }

    function vaardigheidVijf (data) {
        setVaardigheden({...vaardigheden, vijf: data.target.value})
    }

    //vaardigheidRating
    function vaardigheidRatingEen (data) {
        setVaardighedenRating({...vaardighedenRating, een: data.target.value})
    }

    function vaardigheidRatingTwee (data) {
        setVaardighedenRating({...vaardighedenRating, twee: data.target.value})
    }    

    function vaardigheidRatingDrie (data) {
        setVaardighedenRating({...vaardighedenRating, drie: data.target.value})
    }  

    function vaardigheidRatingVier (data) {
        setVaardighedenRating({...vaardighedenRating, vier: data.target.value})
    }  

    function vaardigheidRatingVijf (data) {
        setVaardighedenRating({...vaardighedenRating, vijf: data.target.value})
    }        

    //talen
    function taalEen (data) {
        setTalen({...talen, een: data.target.value})
    }

    function taalTwee (data) {
        setTalen({...talen, twee: data.target.value})
    }

    function taalDrie (data) {
        setTalen({...talen, drie: data.target.value})
    }

    function taalVier (data) {
        setTalen({...talen, vier: data.target.value})
    }

    function taalVijf (data) {
        setTalen({...talen, vijf: data.target.value})
    }

    //talenRating
    function talenRatingEen (data) {
        setTalenRating({...talenRating, een: data.target.value})
    }

    function talenRatingTwee (data) {
        setTalenRating({...talenRating, twee : data.target.value})
    }

    function talenRatingDrie (data) {
        setTalenRating({...talenRating, drie: data.target.value})
    }

    function talenRatingVier (data) {
        setTalenRating({...talenRating, vier: data.target.value})
    }

    function talenRatingVijf (data) {
        setTalenRating({...talenRating, vijf: data.target.value})
    }

    //profiel
    function profileDescription (data) {
        setProfile({...profile, description: data.target.value})
    }

    //educational
    function school(data) {
        setEduTask({...eduTask, school: data.target.value})
    }

    function study(data) {
        setEduTask({...eduTask, study: data.target.value})
    }

    function date(data) {
        setEduTask({...eduTask, date: data.target.value})
    }

    const submit = (e) => { // This is where the input from the user gets transfered from eduTask state to eduTasks (with an s at the end)
        e.preventDefault();
        setEduTasks(eduTasks.concat(eduTask))
        setEduTask({school: '', study: '', date: '', notes: [], id: uniqid()})
    }

    const handleRemove = (id) => {
        const newTasks = eduTasks.filter(element => element.id !== id)
        setEduTasks(newTasks)
    }

    const handleEdit = (id, e) => { // This is the function that will be added the a button next to each bulletpoint to allow the user to edit the bulletpoint.
        const selectList = eduTasks.filter(element => {// this function is passed as a prop to the Educational component (educational.js)
            if(element.id === id) {
                const rightElement = {school: element.school, study: element.study, date: element.date, notes: element.notes, id: element.id};
                setEduTask(rightElement);
                setEduEditTrueOrFalse(true);
                setEduSelectedTask(id)
            }
            displaySegment(3)
        })
    }

    const handleEditChanges = (e) => { // when the user chooses to edit a bulletpoint, it maps through all the bulletpoints for the matchin ID. When found, it replaces its contents.
        e.preventDefault(); 
        const change = eduTasks.map(element => {
            if(element.id === eduSelectedTask) {
                element.school = eduTask.school
                element.study = eduTask.study
                element.date = eduTask.date
                element.notes = eduTask.notes
            }
            return element
        }) 
        setEduTasks(change)
        setEduTask({school: '', study: '', date: '', notes:[], id: uniqid()})
        setEduSelectedTask('')
        setEduEditTrueOrFalse(false)
    }

    const addNote = (element) => {
        let newArray = eduTask.notes.concat(element)
        setEduTask({...eduTask, notes: newArray})
        console.log(eduTask)
    }

    const deleteNote = (element) => {
        const copyOfObject = eduTask.notes
        const keys = Object.keys(copyOfObject)
        const values = Object.values(copyOfObject)
        console.log(keys)
        console.log(values)
        const newArray = []
        keys.forEach((item, index) => {
            newArray.push(values[index])
        })
        newArray.pop()
        setEduTask({...eduTask, notes: newArray})
        console.log(newArray)
        console.log(eduTask.notes)
    }

    const handleNoteChange = (data, index) => {
        const copyOfArray = eduTask.notes.slice();
        copyOfArray[index].note = data.target.value;
        setEduTask({...eduTask, notes: copyOfArray})
    }

    //professional ---
    function proCompany (data) {
        setProTask({...proTask, company: data.target.value})
    }

    function proPosition (data) {
        setProTask({...proTask, position: data.target.value})
    }

    function proMainResponsibilities (data) {
        setProTask({...proTask, mainResponsibilities: data.target.value})
    }

    function proDate (data) {
        setProTask({...proTask, date: data.target.value})
    }

    const proSubmit = (e) => {
        e.preventDefault();
        setProTasks(proTasks.concat(proTask))
        setProTask({company:'', position:'', notes:[], date:'', id: uniqid()})
    }

    const handleRemovePro = (id) => {
        const newTasks = proTasks.filter(element => element.id !== id)
        setProTasks(newTasks)
    }

    const handleEditPro = (id) => {
        const selectList = proTasks.filter(element => {
            if(element.id === id) {
                const rightElement = {company: element.company, position: element.position, notes: element.notes, date: element.date, id: element.id};
                setProTask(rightElement);
                setProEditTrueOrFalse(true);
                setProSelectedTask(id)
            }
        })
        displaySegment(2)
    }

    const handleEditChangesPro = (e) => {
        e.preventDefault(); // find the right array element, change it's content directly, and then use set... to change the state the correct way.
        const change = proTasks.map(element => {
            if(element.id === proSelectedTask) {
                element.company = proTask.company
                element.position = proTask.position
                element.notes = proTask.notes
                element.date = proTask.date
            }
            return element
        }) 
        setProTasks(change)
        setProTask({company:'', position:'', notes:[], date:'', id: uniqid()})
        setProSelectedTask('')
        setProEditTrueOrFalse(false)
    }

    const addNotePro = (element) => {
        let newArray = proTask.notes.concat(element)
        setProTask({...proTask, notes: newArray})
    }

    const deleteNotePro = (element) => {
        const copyOfObject = proTask.notes
        const keys = Object.keys(copyOfObject)
        const values = Object.values(copyOfObject)
        console.log(keys)
        console.log(values)
        const newArray = []
        keys.forEach((item, index) => {
            newArray.push(values[index])
        })
        newArray.pop()
        setProTask({...proTask, notes: newArray})
        console.log(newArray)
        console.log(proTask.notes)
    }

    const handleNoteChangePro = (data, index) => {
        const copyOfArray = proTask.notes.slice();
        copyOfArray[index].note = data.target.value;
        setProTask({...proTask, notes: copyOfArray})
    }

    function CheckHeight (data) { // checks for overflow on the A4. The A4 has a fixed height, so if the content exceeds that fixed height, it knows there is overflow.
        useEffect(() => {
            let divHeight = document.getElementById('links').offsetHeight
            if(divHeight > 1023) {
                setHasOverflow(true)
            } else {
                setHasOverflow(false)
            }
            
        }, [])
        console.log(`overflow: ${hasOverflow}`)
    }

    //The user can add up to five languages on the CV. There are two things the user can change: 1. the language 2. the proficiency.
    // There are five preset divs on the cv application (called talenDiv), they are all empty except the first div. The first div serves as an example for the user.
    // When the user wants to add a language - say a second language - he/she can type in the input and it will be displayed on the cv with a simple onChange function present in talen.js component.
    // The user can delete the added language by clicking on the delete button, which removes the last language. So if the user added 5 languages, it will delete the fifth first (LIFO),
    // all the way down to the first language. The first language is not deletable. When deleting a language, basically what it does is delete the input (language) and select (proficiency).
    // By erasing the input and select, the state that was displaying the user input will be defaulted to an empty string, showing nothing.
    // The default text 'voer een taal in' will also be deleted.
    // The three arrays below include all the ID's that will be used in deleteTaal and addTaal.
    const inputTaalArray = ['inputTaalEen', 'inputTaalTwee', 'inputTaalDrie', 'inputTaalVier', 'inputTaalVijf']
    const labelTaalArray = ['labelTaalEen', 'labelTaalTwee', 'labelTaalDrie', 'labelTaalVier', 'labelTaalVijf']
    const selectTaalArray = ['selectTaalEen', 'selectTaalTwee', 'selectTaalDrie', 'selectTaalVier', 'selectTaalVijf']


    function deleteTaal () {

        const copyOfTalenState = talen
        const copyOfTalenRatingState = talenRating
        const valuesTalen = Object.values(copyOfTalenState)
        const valuesTalenRating = Object.values(copyOfTalenRatingState)
        for(let i = 4; i > 0; i--) {
            const doc = document.getElementById(inputTaalArray[i])
            const ht = window.getComputedStyle(doc, null).getPropertyValue('display') 
            if(window.getComputedStyle(doc, null).getPropertyValue('display') === 'block') {
                document.getElementById(inputTaalArray[i]).style.display = 'none'
                document.getElementById(labelTaalArray[i]).style.display = 'none'
                document.getElementById(selectTaalArray[i]).style.display = 'none'
                valuesTalen[i] = ''
                valuesTalenRating[i] = ''
                const newTalen = {een: valuesTalen[0] , twee: valuesTalen[1], drie: valuesTalen[2], vier: valuesTalen[3], vijf: valuesTalen[4]}
                const newtalenRating = {een: valuesTalenRating[0] , twee: valuesTalenRating[1], drie: valuesTalenRating[2], vier: valuesTalenRating[3], vijf: valuesTalenRating[4]}
                setTalen(newTalen)
                setTalenRating(newtalenRating)
                return
            }
        }
    }

    function addTaal () {
        for(let i = 0; i < 5; i++) {
            const doc = document.getElementById(inputTaalArray[i])
            const ht = window.getComputedStyle(doc, null).getPropertyValue('display') 
            if(window.getComputedStyle(doc, null).getPropertyValue('display') != 'block') {
                document.getElementById(inputTaalArray[i]).style.display = 'block'
                document.getElementById(labelTaalArray[i]).style.display = 'block'
                document.getElementById(selectTaalArray[i]).style.display = 'block'
                return
            }
        }
    }

    //Same method is used for vaardigheden as for talen.
    const inputVaardigheidArray = ['inputVaardigheidEen', 'inputVaardigheidTwee', 'inputVaardigheidDrie', 'inputVaardigheidVier', 'inputVaardigheidVijf']
    const labelVaardigheidArray = ['labelVaardigheidEen', 'labelVaardigheidTwee', 'labelVaardigheidDrie', 'labelVaardigheidVier', 'labelVaardigheidVijf']
    const selectVaardigheidArray = ['selectVaardigheidEen', 'selectVaardigheidTwee', 'selectVaardigheidDrie', 'selectVaardigheidVier', 'selectVaardigheidVijf']

    function deleteVaardigheid () {
        const copyOfVaardighedenState = vaardigheden
        const copyOfVaardighedenRatingState = vaardighedenRating
        const valuesVaardigheden = Object.values(copyOfVaardighedenState)
        const valuesVaardighedenRating = Object.values(copyOfVaardighedenRatingState)
        for(let i = 4; i > 0; i--) {
            const doc = document.getElementById(inputVaardigheidArray[i])
            if(window.getComputedStyle(doc, null).getPropertyValue('display') === 'block') {
                console.log('hello world')
                document.getElementById(inputVaardigheidArray[i]).style.display = 'none'
                document.getElementById(labelVaardigheidArray[i]).style.display = 'none'
                document.getElementById(selectVaardigheidArray[i]).style.display = 'none'
                valuesVaardigheden[i] = ''
                valuesVaardighedenRating[i] = ''
                const newVaardigheden = {een: valuesVaardigheden[0], twee: valuesVaardigheden[1], drie: valuesVaardigheden[2], vier: valuesVaardigheden[3], vijf:valuesVaardigheden[4]}
                const newVaardighedenRating = {een: valuesVaardighedenRating[0], twee: valuesVaardighedenRating[1], drie: valuesVaardighedenRating[2], vier: valuesVaardighedenRating[3], vijf:valuesVaardighedenRating[4]}
                setVaardigheden(newVaardigheden)
                setVaardighedenRating(newVaardighedenRating)
                return
            }
        }
    }

    function addVaardigheid () {
        for(let i = 0; i < 5; i++) {
            const doc = document.getElementById(inputVaardigheidArray[i])
            if(window.getComputedStyle(doc, null).getPropertyValue('display') != 'block') {
                document.getElementById(inputVaardigheidArray[i]).style.display = 'block'
                document.getElementById(labelVaardigheidArray[i]).style.display = 'block'
                document.getElementById(selectVaardigheidArray[i]).style.display = 'block'
                return
            }
        }
    }



    const displaySegment = (segment) => {

        const personalia = document.getElementById('personalia')
        const profiel = document.getElementById('profiel')
        const werkervaring = document.getElementById('werkervaring')
        const opleidingen = document.getElementById('opleidingen')
        const vaardigheden = document.getElementById('vaardigheden')
        const talen = document.getElementById('talen')

        const segmentArray = [personalia, profiel, werkervaring, opleidingen, vaardigheden, talen]
        
        segmentArray.map((element, index) => {
            if(index === segment) {
                element.style.display = 'block'
                document.getElementsByClassName('groupMainButton')[index].style.color = 'black'
            } else {
                element.style.display = 'none'
                document.getElementsByClassName('groupMainButton')[index].style.color = 'white'
            }

        })
    }

    const hideButtons = () => {
        setHideDeleteEdit(true)
    }

    const showButtons = () => {
        setHideDeleteEdit(false)
    }

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
      };

      useEffect(() => {
        adresRef.current.style.fontSize = fontSize;
        telephoneRef.current.style.fontSize = fontSize;
        emailRef.current.style.fontSize = fontSize;
        geboortedatumRef.current.style.fontSize = fontSize;
        rijbewijsRef.current.style.fontSize = fontSize;
      }, [fontSize])
    
      const handleKopstukColorChange = (e) => {
        setKopstuk(e.target.value)
        console.log(e.target.value)
      }

      useEffect(() => {
        kopstukRef.current.style.backgroundColor = kopstuk
      }, [kopstuk])

      const handleFirstLineColor = (e) => {
        setLijn1(e.target.value)
        console.log(e.target.value)
      }

      useEffect(() => {
        lijn1Ref.map((lijn) => {
            lijn.current.style.backgroundColor = lijn1
        })
      }, [lijn1])

      const handleSecondLineColor = (e) => {
        setLijn2(e.target.value)
      }

      useEffect(() => {
        lijn2Ref.map((lijn) => {
            lijn.current.style.backgroundColor = lijn2
        })
      }, [lijn2])



      const hideCV = () => {
        hideRender ? setHideRender(false) : setHideRender(true)
      }

      const handleDownload = () => {
        hideButtons()
        capture()
      }


    return <>
        <div className="appInside" style={hideRender ? {gridTemplateColumns: '1fr 2fr'} : {gridTemplateColumns: '1fr 2fr 1fr'}}>

            <div className="mainButtons">
                <div className="groupMainButtons">
                    <h1 id="title">CV Generator</h1>    
                    <button onClick={() => displaySegment(0)} className="groupMainButton"><h1>Personalia</h1></button>
                    <button onClick={() => displaySegment(1)} className="groupMainButton"><h1>Profiel</h1></button>
                    <button onClick={() => displaySegment(2)}  className="groupMainButton"><h1>Werkervaring</h1></button>
                    <button onClick={() => displaySegment(3)}  className="groupMainButton"><h1>Opleidingen</h1></button>
                    <button onClick={() => displaySegment(4)}  className="groupMainButton"><h1>Vaardigheden</h1></button>
                    <button onClick={() => displaySegment(5)} className="groupMainButton"><h1>Talen</h1></button>
                    <LetterGrootteSidebar handleFontSizeChange={handleFontSizeChange} fontSize={fontSize}/>
                    <HeaderColor handleKopstukColorChange={handleKopstukColorChange} kopstuk={kopstuk}/>
                    <FirstLineColor handleFirstLineColor={handleFirstLineColor} lijn1={lijn1}/>
                    <SecondLineColor handleSecondLineColor={handleSecondLineColor} lijn2={lijn2}/>



                </div>
                <div className="groupMainButtons">
                    <button style={{color: 'black'}} className="groupMainButton" id="hideCV" onClick={hideCV}>{hideRender ? <h1>Toon cv (mobile friendly)</h1> : <h1>Verberg cv (mobile friendly)</h1>}</button>
                    <button style={hideDeleteEdit ?{backgroundColor:'green'} : {backgroundColor:'rgb(227,107,8)'}} className="groupMainButton" id="hideButton" onClick={hideButtons}><h1>Verberg edit/delete knoppen</h1></button>
                    <button style={hideDeleteEdit ?{backgroundColor:'rgb(227,107,8)'} : {backgroundColor:'green'} } className="groupMainButton" id="showButton" onClick={showButtons}><h1>Toon edit/delete knoppen</h1></button>

                    
                </div>
                {hasOverflow ? <button className="groupMainButton" id="overflow"><h1>Overloop geconstateerd?: JA</h1></button> : <button className="groupMainButton" id="overflow"><h1>Overloop geconstateerd?: NEE</h1></button>}
                <button onClick={handleDownload}><h1>Download CV</h1></button>
            </div>
            <div className="centralButtons">
                <div id="personalia">
                    <Personal personalInfo={personal} personalName={personalName} personalEmail={personalEmail} personalPhone={personalPhone} personalCity={personalCity} personalBirthDate={personalBirthDate} personalCar={personalCar}/>
                </div>
                <div id="profiel">
                    <Profile profile={profileDescription} profileDescription={profile.description} />
                </div>
                <div id="opleidingen">
                    <Educational 
                    school={school} 
                    schoolValue={eduTask.school}
                    study={study}
                    studyValue={eduTask.study}
                    date={date}     
                    dateValue={eduTask.date}
                    submit={ (e) => submit(e) }
                    eduEditTrueOrFalse={eduEditTrueOrFalse}
                    handleEditChanges={handleEditChanges}
                    addNote={() => addNote({note: '', id: uniqid()})}
                    notes={eduTask.notes}
                    handleNoteChange={(handleNoteChange)}
                    deleteNote={deleteNote}
                    />
                </div>
                <div id="werkervaring">
                    <Professional
                    company={proCompany}
                    companyValue={proTask.company}
                    position ={proPosition}
                    positionValue={proTask.position}
                    mainResponsibilities={proMainResponsibilities}
                    mainResponsibilitiesValue={proTask.mainResponsibilities}
                    date={proDate}
                    dateValue={proTask.date}
                    submit={(e) => proSubmit(e)}
                    proEditTrueOrFalse={proEditTrueOrFalse}
                    handleEditChanges={handleEditChangesPro}
                    addNote={() => addNotePro({note: '', id: uniqid()})}
                    notes={proTask.notes}
                    handleNoteChangePro={(handleNoteChangePro)}
                    deleteNotePro={deleteNotePro}
                    />
                </div>
                <div id="vaardigheden">
                    <Vaardigheden
                    vaardigheden={vaardigheden}
                    vaardigheidEen={vaardigheidEen}
                    vaardigheidTwee={vaardigheidTwee}
                    vaardigheidDrie={vaardigheidDrie}
                    vaardigheidVier={vaardigheidVier}
                    vaardigheidVijf={vaardigheidVijf}
                    vaardighedenRating={vaardighedenRating}
                    vaardigheidRatingEen={vaardigheidRatingEen}
                    vaardigheidRatingTwee={vaardigheidRatingTwee}
                    vaardigheidRatingDrie={vaardigheidRatingDrie}
                    vaardigheidRatingVier={vaardigheidRatingVier}
                    vaardigheidRatingVijf={vaardigheidRatingVijf}
                    deleteVaardigheid={deleteVaardigheid}
                    addVaardigheid={addVaardigheid}
                    />
                </div>
                <div id="talen">
                    <Talen
                    talen={talen}
                    taalEen={taalEen}
                    taalTwee={taalTwee}
                    taalDrie={taalDrie}
                    taalVier={taalVier}
                    taalVijf={taalVijf}
                    talenRating={talenRating}
                    talenRatingEen={talenRatingEen}
                    talenRatingTwee={talenRatingTwee}
                    talenRatingDrie={talenRatingDrie}
                    talenRatingVier={talenRatingVier}
                    talenRatingVijf={talenRatingVijf}
                    deleteTaal={deleteTaal}
                    addTaal={addTaal}
                    />
                </div>
            </div>
            <div ref={hideRef} className="renderWrap" id="captureWrap" style={hideRender ? {display: 'none'} : {display: 'block'}}>


            <div  className="render" id="capture" style={hideRender ? {display: 'none'} : {display: 'grid'}}>
                <div ref={kopstukRef} className="headerName"> <h1 className="h1" >{personal.name}</h1> </div>

                <div className="links" id="links">
                    <div className="profiel">
                        <h1 className="header" id="header">Profiel
                        <div className="line1" ref={lijn1Ref[0]}> </div>
                        <div className="line2" ref={lijn2Ref[0]}> </div>
                        </h1> 
                        <div className="segmentProfiel">{profile.description}</div>
                    </div>

                    <div className="werkervaring">
                        <h1 className="header" id="header">Werkervaring
                        <div className="line1" ref={lijn1Ref[1]}> </div>
                        <div className="line2" ref={lijn2Ref[1]}> </div> 
                        </h1>
                        <OverviewPro tasks={proTasks} handleRemove={handleRemovePro} handleEdit={handleEditPro} hideDeleteEdit={hideDeleteEdit}/>
                    </div>

                    <div className="opleidingen">
                        <h1 className="header" id="header" >Opleidingen
                        <div className="line1" ref={lijn1Ref[2]}> </div>
                        <div className="line2" ref={lijn2Ref[2]}> </div> 
                        </h1>
                        <OverviewEdu tasks={eduTasks} handleRemove={handleRemove} handleEdit={handleEdit} hideDeleteEdit={hideDeleteEdit}/>
                    </div>
                </div>
                

                <div className="rechts">

                    <div className="personalia">
                        <h1 className="header" >Personalia
                        <div className="line1" ref={lijn1Ref[3]}> </div>
                        <div className="line2" ref={lijn2Ref[3]}> </div> 
                        </h1>
                        <div ref={adresRef} className="personaliDiv"><FontAwesomeIcon icon={faLocationDot} /> <b>Adres: </b><br></br>{personal.city} <br></br></div>
                        <div ref={telephoneRef} className="personaliDiv"><FontAwesomeIcon icon={faPhone} /> <b>Telefoon:</b> <br></br>{personal.phone} <br></br></div>
                        <div ref={emailRef} className="personaliDiv"><FontAwesomeIcon icon={faEnvelope} /><b>E-mail:</b> <br></br>{personal.email} <br></br></div>
                        <div ref={geboortedatumRef} className="personaliDiv"><FontAwesomeIcon icon={faCalendar} /><b>Geboortedatum:</b> <br></br> {personal.birthDate} <br></br></div>
                        <div ref={rijbewijsRef} className="personaliDiv"><FontAwesomeIcon icon={faCar} /><b>Rijbewijs:</b> <br></br> {personal.car} <br></br> </div>
                    </div>

                    <div className="vaardigheden">
                        <h1 className="header" >Vaardigheden
                        <div className="line1" ref={lijn1Ref[4]}> </div>
                        <div className="line2" ref={lijn2Ref[4]}> </div> 
                        </h1>
                        <div className="vaardighedenDiv">
                            <b>{vaardigheden.een}</b> <br></br>
                            <Rating ratingvalue={vaardighedenRating.een} />  
                        </div>
                        <div className="vaardighedenDiv">
                            <b>{vaardigheden.twee}</b> <br></br>
                            <Rating ratingvalue={vaardighedenRating.twee} />
                        </div>
                        <div className="vaardighedenDiv">
                            <b>{vaardigheden.drie}</b> <br></br>
                            <Rating ratingvalue={vaardighedenRating.drie}/>
                        </div>
                        <div className="vaardighedenDiv">
                            <b>{vaardigheden.vier}</b> <br></br>
                            <Rating ratingvalue={vaardighedenRating.vier}/>
                        </div>
                        <div className="vaardighedenDiv">
                            <b>{vaardigheden.vijf}</b> <br></br>
                            <Rating ratingvalue={vaardighedenRating.vijf}/>
                        </div>
                    </div>

                    <div className="talen">
                        <h1 className="header" >Talen
                        <div className="line1" ref={lijn1Ref[5]}> </div>
                        <div className="line2" ref={lijn2Ref[5]}> </div>
                        </h1>
                        <div className="talenDiv">
                            <b>{talen.een}</b> <br></br>
                            <div className="talenRating">{talenRating.een}</div>
                        </div>
                        <div className="talenDiv">
                            <b>{talen.twee}</b><br></br>
                            <div className="talenRating">{talenRating.twee}</div>
                        </div>
                        <div className="talenDiv">
                            <b>{talen.drie}</b> <br></br>
                            <div className="talenRating">{talenRating.drie}</div>
                        </div> 
                        <div className="talenDiv">
                            <b>{talen.vier}</b> <br></br>
                            <div className="talenRating">{talenRating.vier}</div>
                        </div>
                        <div className="talenDiv">
                            <b>{talen.vijf}</b> <br></br>
                            <div className="talenRating">{talenRating.vijf}</div>
                        </div>   
                    </div>
                </div>
            </div>
            </div>
        <CheckHeight/>
    </div>
    </>
}

export default Parent;