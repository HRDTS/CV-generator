import React from "react";
import { faCircle as faCircleRegular } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCar, faCircle, faEnvelope, faLocationDot, faPhone,} from '@fortawesome/free-solid-svg-icons'

// this is where I render the icons used for 'vaardigheden'. The user can select an option from a select menu. Based on that option (which is a number), this function spits out the right values.

const darkStar = <FontAwesomeIcon icon={faCircle}/>
const lightStar = <FontAwesomeIcon icon={faCircleRegular} />

const ratingArray = 
[
    [darkStar, lightStar, lightStar, lightStar, lightStar],
    [darkStar, darkStar, lightStar, lightStar, lightStar],
    [darkStar, darkStar, darkStar, lightStar, lightStar],
    [darkStar, darkStar, darkStar, darkStar, lightStar],
    [darkStar, darkStar, darkStar, darkStar, darkStar]
]

export function Rating(props) {
    const ratingvalue = props.ratingvalue
    return ratingArray[ratingvalue]
}