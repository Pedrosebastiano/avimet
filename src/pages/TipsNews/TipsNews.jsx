import React from "react";
import styles from "./TipsNews.module.css";
import CarruselConsejos from "../../components/CarruselConsejos/CarruselConsejos";
import TarjetaNoticias, {
  noticiasData,
} from "../../components/tarjetaNoticias/TarjetaNoticias";

function TipsNews() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container1}>
          <div className={styles.carouselTitleContainer}>
            <h2 className={styles.carouselTitle}>
              Consejos <span className={styles.italicText}>para tu experiencia</span>
            </h2>
          </div>
          <CarruselConsejos />
        </div>
        <div className={styles.container2}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Entérate de lo último...</h2>
          </div>
          <div className={styles.tarjetasnoticias_container}>
            {noticiasData.map((noticia, index) => (
              <TarjetaNoticias
                key={index}
                imagen={noticia.imagen}
                titulo={noticia.titulo}
                fecha={noticia.fecha}
                descripcion={noticia.descripcion}
                link={noticia.link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TipsNews;