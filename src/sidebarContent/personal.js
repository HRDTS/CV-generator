import React from "react";

const Personal = (props) => {
    const personalInfo = props.personalInfo
    const personalName = props.personalName
    const personalEmail = props.personalEmail
    const personalPhone = props.personalPhone
    const personalCity = props.personalCity
    const personalBirthDate = props.personalBirthDate
    const personalCar = props.personalCar

    return <>
    <form className="personal">
        <label htmlFor="nameInput" > Voor- en achternaam </label>
        <input
        onChange={personalName}
        value={personalInfo.name}
        type='text'
        id="nameInput"
        />

        <label htmlFor="cityInput" > Adres </label>
        <input
        onChange={personalCity}
        value={personalInfo.city}
        type='text'
        id="cityInput"
        maxLength={90}
        />

        <label htmlFor="phoneInput" > Telefoonnummer </label>
        <input
        onChange={personalPhone}
        value={personalInfo.phone}
        type='text'
        id="phoneInput"
        maxLength={20}
        />

        <label htmlFor="emailInput" > E-mail </label>
        <input
        onChange={personalEmail}
        value={personalInfo.email}
        type='text'
        id="emailInput"
        maxLength={60}
        />

        <label htmlFor="birthDateInput" > Geboortedatum</label>
        <input
        onChange={personalBirthDate}
        value={personalInfo.birthDate}
        type='text'
        id="birthDateInput"
        maxLength={20}
        />

        <label htmlFor="carInput" > Heb je een autorijbewijs? </label>
        <select id="carInput" onChange={personalCar} value={personalInfo.car}>
            <option value='' disabled >kies een van de opties</option>
            <option defaultValue='Rijbewijs B'>Rijbewijs B</option>
            <option defaultValue='Rijbewijs B en meer'>Rijbewijs B en meer</option>
            <option defaultValue='Geen'>Geen</option>
        </select>
    </form>
    </>
}

export default Personal;