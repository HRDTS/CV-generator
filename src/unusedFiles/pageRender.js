import React, { Component } from "react";
import Educational from "../mainContent/educational";


class Render extends Component {
    constructor() {
        super();
    }
    
    

    render() {
        return (
            <div className="render">
                <div className="personalSegment"> personal</div>
                <div className="educationalSegment">educational</div>
                <div className="professionalSegment">professional</div>
            </div>
        )
    }
}

    /*
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
*/


export default Render;