import React from "react";

const Talen = (props) => {

    const talen = props.talen
    const taalEen = props.taalEen
    const taalTwee = props.taalTwee
    const taalDrie = props.taalDrie
    const taalVier = props.taalVier
    const taalVijf = props.taalVijf
    const talenRatingEen = props.talenRatingEen
    const talenRatingTwee = props.talenRatingTwee
    const talenRatingDrie = props.talenRatingDrie
    const talenRatingVier = props.talenRatingVier
    const talenRatingVijf = props.talenRatingVijf
    const talenRating = props.talenRating
    const deleteTaal = props.deleteTaal
    const addTaal = props.addTaal

    return<>
    <form className="talenCentral">
        <label htmlFor="taalEen" id="labelTaalEen" className="labelTaal"> Voeg taal toe </label>
        <input
        onChange={taalEen}
        value={talen.een}
        type='text'
        id="inputTaalEen"
        className="inputTaal"
        maxLength={40}
        />
        <select name="taalEen" id="selectTaalEen" className="selectTaal" value={talenRating.een} onChange={talenRatingEen}>
        <option>kies niveau</option>
        <option value='moedertaal'>moedertaal</option>
        <option value='uitstekend'>uitstekend</option>
        <option value='goed'>goed</option>
        <option value='redelijk'>redelijk</option>
        <option value='matig'>matig</option>
        </select>

        
        <label htmlFor="taalTwee" id="labelTaalTwee" className="labelTaal"> Voeg taal toe  </label>
        <input
        onChange={taalTwee}
        value={talen.twee}
        type='text'
        id="inputTaalTwee"
        className="inputTaal"
        maxLength={40}
        />
        <select name="taalTwee" id="selectTaalTwee" className="selectTaal" value={talenRating.twee} onChange={talenRatingTwee}>
        <option>kies niveau</option>
        <option value='moedertaal'>moedertaal</option>
        <option value='uitstekend'>uitstekend</option>
        <option value='goed'>goed</option>
        <option value='redelijk'>redelijk</option>
        <option value='matig'>matig</option>
        </select>


        <label htmlFor="taalDrie" id="labelTaalDrie" className="labelTaal"> Voeg taal toe  </label>
        <input
        onChange={taalDrie}
        value={talen.drie}
        type='text'
        id="inputTaalDrie"
        className="inputTaal"
        maxLength={40}
        />
        <select name="taalDrie" id="selectTaalDrie" className="selectTaal" value={talenRating.drie} onChange={talenRatingDrie}>
        <option>kies niveau</option>
        <option value='moedertaal'>moedertaal</option>
        <option value='uitstekend'>uitstekend</option>
        <option value='goed'>goed</option>
        <option value='redelijk'>redelijk</option>
        <option value='matig'>matig</option>
        </select>

        <label htmlFor="taalVier" id="labelTaalVier" className="labelTaal"> Voeg taal toe </label>
        <input
        onChange={taalVier}
        value={talen.vier}
        type='text'
        id="inputTaalVier"
        className="inputTaal"
        maxLength={40}
        />
        <select name="taalVier" id="selectTaalVier" className="selectTaal" value={talenRating.vier} onChange={talenRatingVier}>
        <option>kies niveau</option>
        <option value='moedertaal'>moedertaal</option>
        <option value='uitstekend'>uitstekend</option>
        <option value='goed'>goed</option>
        <option value='redelijk'>redelijk</option>
        <option value='matig'>matig</option>
        </select>        

        <label htmlFor="taalVijf" id="labelTaalVijf" className="labelTaal"> Voeg taal toe  </label>
        <input
        onChange={taalVijf}
        value={talen.vijf}
        type='text'
        id="inputTaalVijf"
        className="inputTaal"
        maxLength={40}
        />
        <select name="taalVijf" id="selectTaalVijf" className="selectTaal" value={talenRating.vijf} onChange={talenRatingVijf}>
        <option>kies niveau</option>
        <option value='moedertaal'>moedertaal</option>
        <option value='uitstekend'>uitstekend</option>
        <option value='goed'>goed</option>
        <option value='redelijk'>redelijk</option>
        <option value='matig'>matig</option>
        </select>
            <button type="button" onClick={deleteTaal} className='middleButton'>Verwijder taal</button>
            <button type="button" onClick={addTaal} className='middleButton'>Voeg taal toe</button>       

    </form>

    </>
}

export default Talen;