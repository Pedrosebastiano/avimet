import React from "react";
import imgVivero from "../../assets/noticias/img-vivero.png";
import imgEcosustentable from "../../assets/noticias/img-ecosustentable.jpg";
import imgReciclaje from "../../assets/noticias/img-reciclaje.jpg";
import imgReforestacion from "../../assets/noticias/img-reforestacion.jpg";
import styles from "./TarjetaNoticias.module.css";

const TarjetaNoticias = ({ titulo, fecha, descripcion, imagen, link }) => {
  return (
    <div
      className={styles.tarjeta_noticia}
      style={{
        backgroundImage: `linear-gradient(#d9f5dea0, #d9f5def6), url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.contenido}>
        <span className={styles.fecha}>{fecha}</span>
        <h2 className={styles.titulonoticia}>{titulo}</h2>
        <p className={styles.descripcion}>{descripcion}</p>
        <button
          className={`btn-primary ${styles.btnMasInfo}`}
          onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default TarjetaNoticias;

export const noticiasData = [
  {
    imagen: imgVivero,
    titulo: "Proyecto Ávila Inaugura Vivero Ecoeficiente",
    fecha: "10.07.2022",
    descripcion:
      "El Proyecto Ávila ha inaugurado un vivero ecoeficiente diseñado para producir al menos 5.000 plantas anuales. El vivero utiliza un sistema de riego interno interconectado con el sistema hídrico del cortafuego verde, manejado por gravedad y con aspersores.",
    link: "https://www.unimet.edu.ve/proyecto-avila/",
  },
  {
    imagen: imgEcosustentable,
    titulo: "UNIMET, la universidad más sustentable de Venezuela",
    fecha: "10.07.2022",
    descripcion:
      "La Universidad Metropolitana, asumiendo con responsabilidad las mejoras para dar respuestas a los desafíos globales y locales, nuevamente ve premiado su esfuerzo durante el 2023, al ser reconocida como el primer campus sustentable del país.",
    link: "https://www.unimet.edu.ve/proyecto-avila/",
  },
  {
    imagen: imgReciclaje,
    titulo: "Nueva Iniciativa de Reciclaje en Caracas",
    fecha: "15.08.2023",
    descripcion:
      "Una alianza entre ONG ambientales y empresas locales ha permitido la creación de nuevos puntos de reciclaje en Caracas. Esta iniciativa busca reducir la cantidad de desechos plásticos y fomentar la economía circular en la ciudad.",
    link: "https://www.vozdeamerica.com/a/los-venezolanos-detras-del-taller-neo-un-exito-de-reciclaje-en-caracas/7224221.html",
  },
  {
    imagen: imgReforestacion,
    titulo: "Jornada de Reforestación en el Parque Nacional El Ávila",
    fecha: "22.09.2023",
    descripcion:
      "Más de 200 voluntarios participaron en una jornada de reforestación en el Parque Nacional El Ávila, plantando más de 1.500 árboles nativos. La actividad busca restaurar áreas afectadas por incendios y promover la conservación del ecosistema.",
    link: "https://www.unimet.edu.ve/proyecto-avila/",
  },
];
