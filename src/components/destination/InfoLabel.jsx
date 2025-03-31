import React from "react"
import "./Destination.css"
import { SignIcon } from "../../assets/icons"
import { DifficutlyIcon } from "../../assets/icons/DifficultyIcon"
import { ClockIcon } from "../../assets/icons/ClockIcon"

export default function InfoLabel( { title, info } ) {
    var icon = ""
    if (title == "Distancia") {
        icon = <SignIcon className="sign"/>
    } else if ( title == "Tiempo Estimado") {
        icon = <ClockIcon className="clock"/>
    } else {
        icon = <DifficutlyIcon className="difficulty"/>
    }
        

    return (
        <div className="info-container">
            { icon }
            <div className="text-container">
                <p className="text-title">{ title }</p>
                { info }
            </div>
        </div>
        )

}