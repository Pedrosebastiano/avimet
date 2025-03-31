import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import BannerTitle from "../banner/BannerTitle"
import "./Destination.css"
import { ArrowBackIcon } from "../../assets/icons/ArrowBackIcon"

export default function DestinationHeader({ titulo, subtitulo, image, difficulty, estimatedTime, distance, guide, descriptionTitle, dateDisponible, slug }) {
    const navigate = useNavigate();

    const handleReturn = useCallback(() => {
        window.history.back();
    }, []);

    const handleBooking = useCallback(() => {

        navigate('/booking', {
            state: {
                titulo,
                subtitulo,
                image,
                difficulty,
                estimatedTime,
                distance, 
                guide,
                descriptionTitle,
                dateDisponible,
                slug
            }
        });
    }, [navigate, titulo, subtitulo, image, difficulty, estimatedTime, distance, guide, descriptionTitle, dateDisponible, slug]);

    return (
        <div className="header-container" style={{ backgroundImage: `url(${image})`}}>
            <button className="btn-tertiary return-button" onClick={handleReturn}>
                <ArrowBackIcon className="arrow-back" />
                Volver
            </button>
            <BannerTitle
                subtitulo={subtitulo}
                titulo={titulo}
                botonTexto="Reservar"
                onButtonClick={handleBooking}
                slug={slug}
            />
        </div>
    )
}