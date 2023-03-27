import React from "react"

export const LetterGrootteSidebar = (props) => {
    const handleFontSizeChange = props.handleFontSizeChange
    const fontSize = props.fontSize

    return(
    <div className="letterGrootteSidebar">
        <label>Lettergrootte aanpassen voor Personalia</label>
        <select value={fontSize} onChange={handleFontSizeChange}>
            <option value='14px'>klein (14px)</option>
            <option value='15px'>middel (15px)</option>
            <option value='16px'>groot (16px)</option>
        </select>
    </div>
    )

}

export const LetterGrootteMainContent = () => {
    return(
    <div className="letterGrootteMainContent">
        <label>Lettergrootte aanpassen voor Profiel, Werkervaring en Opleidingen</label>
        <select value='15'>
            <option value='14'>klein (14px)</option>
            <option value='15'>middel (15px)</option>
            <option value='16'>groot (16px)</option>
        </select>
    </div>
    )

}

export const Koppelteken = () => {
    return(
        <div className="koppelteken">
            Koppelteken in tekst
            <div className="koppeltekenContent">
                <label >
                aan
                <input
                checked
                type='radio'
                name="koppelteken"
                value='aan'
                />
                </label>
                <label >
                uit
                <input
                type='radio'
                name="koppelteken"
                value='aan'
                />
                </label>
            </div>
        </div>
    )
}

export const Wordbreak = () => {
    return(
        <div className="wordbreak">
            Word-break in tekst
            <div className="wordbreakContent">
                <label >
                aan
                <input
                checked
                type='radio'
                name="wordbreak"
                value='aan'
                />
                </label>
                <label >
                uit
                <input
                type='radio'
                name="wordbreak"
                value='aan'
                />
                </label>
            </div>
        </div>
    )
}

export const HeaderColor = (props) => {
    const handleKopstukColorChange = props.handleKopstukColorChange
    const kopstuk = props.kopstuk
    return (
        <div className="headerColor">
        Verander de kleur van je kopstuk
        <input type='color' value={kopstuk} onChange={handleKopstukColorChange}/>
      </div>
    )
}

 export const FirstLineColor = (props) => {
    const handleFirstLineColor = props.handleFirstLineColor
    const lijn1 = props.lijn1
    return (
        <div className="firstLineColor">
            Verander de kleur van de eerste lijnen tussen de segmenten
            <input type='color' onChange={handleFirstLineColor} value={lijn1}/>
        </div>
    )
}

export const SecondLineColor = (props) => {
    const handleSecondLineColor = props.handleSecondLineColor
    const lijn2 = props.lijn2
    return (
        <div className="secondLineColor">
            Verander de kleur van de tweede lijnen tussen de segmenten
            <input type='color' onChange={handleSecondLineColor} value={lijn2}/>
        </div>
    )
}