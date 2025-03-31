import React from "react";
import {useNavigate } from "react-router-dom";
import "./Destination.css";

function DescriptionCard({ image , description , title}) {
  const navigation = useNavigate();
  return (
    <section className='destination-card'>
      <div className='card-container'>
        <div className='content-wrapper'>
            <img
                src={image}
                alt="Destination view"
                className='destination-image'
            />
            <div className='text-content'>
                <h2 className='title'>{title}</h2>
                <p className='description'>
                    {description}
                </p>
                <button className='btn-quaternary' onClick={() => navigation('/tips-news')}>
                    Ver consejos
                </button>
            </div>
        </div>
      </div>
    </section>
  );
}

export default DescriptionCard;