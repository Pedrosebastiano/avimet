import React from "react"
import "./Destination.css"
import InfoLabel from "./InfoLabel"

export default function MapBanner( { destination, estimatedTime, difficulty, distance, image } ) {
    return (
    <div className="map-banner">
        <div className="map-container">
            <img src={image} className="map" />
            <div className="about-container">
                <div><span className="first-part">Sobre</span> {destination} </div>
                <InfoLabel title="Distancia" info={distance}/>
                <InfoLabel title="Tiempo Estimado" info={estimatedTime}/>
                <InfoLabel title="Dificultad" info={difficulty}/>
            </div>
        </div>
    </div>
    
    )
}