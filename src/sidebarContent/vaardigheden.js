import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCar, faCircle, faEnvelope, faLocationDot, faPhone,} from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from "@fortawesome/fontawesome-free-regular";

const Vaardigheden = (props) => {

    const vaardigheden = props.vaardigheden
    const vaardigheidEen = props.vaardigheidEen
    const vaardigheidTwee = props.vaardigheidTwee
    const vaardigheidDrie = props.vaardigheidDrie
    const vaardigheidVier = props.vaardigheidVier
    const vaardigheidVijf = props.vaardigheidVijf
    const vaardigheidRatingEen = props.vaardigheidRatingEen
    const vaardigheidRatingTwee = props.vaardigheidRatingTwee
    const vaardigheidRatingDrie = props.vaardigheidRatingDrie
    const vaardigheidRatingVier = props.vaardigheidRatingVier
    const vaardigheidRatingVijf = props.vaardigheidRatingVijf
    const vaardighedenRating = props.vaardighedenRating
    const deleteVaardigheid = props.deleteVaardigheid
    const addVaardigheid = props.addVaardigheid


// users can check a value for their skills. This value from 0 to 4 will be used to render cool icons in ratingCircles.js

    return<>
    <form className="vaardighedenCentral">
        <label htmlFor="vaardigheidEen" id="labelVaardigheidEen" className="labelVaardigheid"> Voeg vaardigheid toe </label>
        <input
        onChange={vaardigheidEen}
        value={vaardigheden.een}
        type='text'
        id="inputVaardigheidEen"
        className="labelVaardigheid"
        maxLength={40}
        />

        <select name="vaardigheidEen" id="selectVaardigheidEen" className="selectVaardigheid" value={vaardighedenRating.een} onChange={vaardigheidRatingEen}>
        <option>kies niveau</option>
        <option value={0}>1/5</option>
        <option value={1}>2/5</option>
        <option value={2}>3/5</option>
        <option value={3}>4/5</option>
        <option value={4}>5/5</option>
        </select>
        
        <label htmlFor="vaardigheidTwee" id="labelVaardigheidTwee" className="labelVaardigheid"> Voeg vaardigheid toe</label>
        <input
        onChange={vaardigheidTwee}
        value={vaardigheden.twee}
        type='text'
        id="inputVaardigheidTwee"
        className="labelVaardigheid"
        maxLength={40}
        />
        <select name="vaardigheidTwee" id="selectVaardigheidTwee" className="selectVaardigheid" value={vaardighedenRating.twee} onChange={vaardigheidRatingTwee}>
        <option>kies niveau</option>
        <option value={0}>1/5</option>
        <option value={1}>2/5</option>
        <option value={2}>3/5</option>
        <option value={3}>4/5</option>
        <option value={4}>5/5</option>
        </select>
        <label htmlFor="vaardigheidDrie" id="labelVaardigheidDrie" className="labelVaardigheid"> Voeg vaardigheid toe</label>
        <input
        onChange={vaardigheidDrie}
        value={vaardigheden.drie}
        type='text'
        id="inputVaardigheidDrie"
        className="labelVaardigheid"
        maxLength={40}
        />
        <select name="vaardigheidDrie" id="selectVaardigheidDrie" className="selectVaardigheid" value={vaardighedenRating.drie} onChange={vaardigheidRatingDrie}>
        <option>kies niveau</option>
        <option value={0}>1/5</option>
        <option value={1}>2/5</option>
        <option value={2}>3/5</option>
        <option value={3}>4/5</option>
        <option value={4}>5/5</option>
        </select>
        <label htmlFor="vaardigheidVier" id="labelVaardigheidVier" className="labelVaardigheid"> Voeg vaardigheid toe</label>
        <input
        onChange={vaardigheidVier}
        value={vaardigheden.vier}
        type='text'
        id="inputVaardigheidVier"
        className="labelVaardigheid"
        maxLength={40}
        />
        <select name="vaardigheidVier" id="selectVaardigheidVier" className="selectVaardigheid" value={vaardighedenRating.vier} onChange={vaardigheidRatingVier}>
        <option>kies niveau</option>
        <option value={0}>1/5</option>
        <option value={1}>2/5</option>
        <option value={2}>3/5</option>
        <option value={3}>4/5</option>
        <option value={4}>5/5</option>
        </select>
        <label htmlFor="vaardigheidVijf" id="labelVaardigheidVijf" className="labelVaardigheid"> Voeg vaardigheid toe </label>
        <input
        onChange={vaardigheidVijf}
        value={vaardigheden.vijf}
        type='text'
        id="inputVaardigheidVijf"
        className="labelVaardigheid"
        maxLength={40}
        />
        <select name="vaardigheidVijf" id="selectVaardigheidVijf" className="selectVaardigheid" value={vaardighedenRating.vijf} onChange={vaardigheidRatingVijf}>
        <option>kies niveau</option>
        <option value={0}>1/5</option>
        <option value={1}>2/5</option>
        <option value={2}>3/5</option>
        <option value={3}>4/5</option>
        <option value={4}>5/5</option>
        </select>
            <button type="button" onClick={deleteVaardigheid} className='middleButton'>Verwijder vaardigheid</button>
            <button type="button" onClick={addVaardigheid} className='middleButton'>Voeg vaardigheid toe</button>   
    </form>
    </>
}

export default Vaardigheden;