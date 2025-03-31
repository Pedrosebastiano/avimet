import React from "react";
import styles from './TarjetaDestinos.module.css'
import {useNavigate } from "react-router-dom";
import imgQbradaQnt from "../../assets/home/quebrada-quintero.png"
import imgPicoNaiguata from "../../assets/home/pico-naiguata.png"
import imgSabasNieves from "../../assets/home/sabas-nieves.png"


const TarjetaDestinos = ({ imagen, titulo, descripcion, colorClase, direccion, diseñoTarjeta, diseñoBoton, diseñoImagen}) => {
  const navigation = useNavigate();
  return (
    <div className={`${styles.tarjetaDestino} ${styles?.[colorClase]} ${diseñoTarjeta}`}>
      <img src={imagen} alt={titulo} className={`${styles.imagenDestino} ${diseñoImagen}`} />
      <div className={`${styles.contenidoDestino}`}>
        <h2 className={styles.tituloDestino}>{titulo}</h2>
        <p className={styles.descripcionDestino}>{descripcion}</p>
        <button className={`btn-quaternary ${styles.btnMasInfo} ${diseñoBoton}`} onClick={() => navigation(direccion)}>Más información</button>
      </div>
    </div>
  );
};

export default TarjetaDestinos;

export const destinosData = [
    {
        imagen: imgQbradaQnt,
        titulo: "Quebrada Quintero",
        descripcion: "La Quebrada Quintero, cerca de Municipio Sucre, Miranda, es un bellísimo destino paradisíaco lleno de rocas y un ambiente natural perfecto para disfrutar junto a amigos o familia. Esta ruta de 6.3 km tarda alrededor de 2h 38 m en ser recorrida, no suele ser un recorrido muy movido, siendo una de las rutas más sencillas de realizar si solo deseas pasar un buen rato.",
        colorClase: "darkgreen" ,
        direccion: "/destinations/quebrada-quintero"
    },
    {
        imagen: imgPicoNaiguata,
        titulo: "Sabas Nieves",
        descripcion: "Sabas Nieves es uno de los principales puntos de entrada del Parque Nacional El Ávila en Caracas, Venezuela. Popular entre los amantes del senderismo, esta ruta ofrece una mezcla de desafíos moderados y paisajes fascinantes. El sendero serpentea a través de frondosos bosques, conducente a vistas panorámicas de la ciudad, y es el lugar ideal para aquellos que buscan una escapada natural sin alejarse demasiado de la urbe.",
        colorClase: "lightgreen" ,
        direccion: "/destinations/sabas-nieves"
    },
    {
      imagen: imgSabasNieves,
      titulo: "Pico Naiguata",
      descripcion: "El Pico Naiguatá es una majestuosa cima ubicada en el Parque Nacional El Ávila, cercano a Caracas, Venezuela. Con una altitud de aproximadamente 2.765 metros (sobre el nivel del mar), el pico ofrece vistas panorámicas espectaculares de la ciudad y el Mar Caribe. Amado por los excursionistas y escaladores, el Pico Naiguatá es un símbolo natural de fortaleza y belleza, invitando a los aventureros a disfrutar de su entorno rico en biodiversidad y paisajes impresionantes",
      colorClase: "darkgreen" ,
      direccion: "/destinations/pico-naiguata"
  },
];