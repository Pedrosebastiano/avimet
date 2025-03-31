import * as React from "react";
import styles from "./AvilaMountain.module.css";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import image1 from '../../assets/home/carousel1.png'
import image2 from '../../assets/home/carousel2.png'
import image3 from '../../assets/home/carousel3.png'
import image4 from '../../assets/home/carousel4.png'
import image5 from '../../assets/home/background-avila.jpg'
import image6 from '../../assets/pico-naiguata/pico-naiguata-carousel-image-3.png'
import image7 from '../../assets/pico-naiguata/pico-naiguata-carousel-image-1.png'
import image8 from '../../assets/quebrada-quintero/quebrada-quintero-carousel-image-3.png'

function AvilaMountainHero() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.Carousel}>
          <ProductCarousel 
            images={[image1,image2,image3,image4,image5,image6,image7,image8]}
            className=""
          />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <article className={styles.contentWrapper}>
          <h1 className={styles.title}>
            <span className={styles.titleStart}>El Ávila, </span>
            <span className={styles.titleEnd}>
              el Guardián Natural de Caracas
            </span>
          </h1>
          <p className={styles.description}>
            El Ávila, oficialmente conocido como el Parque Nacional Waraira
            Repano, es mucho más que un ícono de la ciudad de Caracas: es un
            escudo protector que combina belleza natural, biodiversidad y un
            espacio de esparcimiento para quienes buscan desconectarse del ritmo
            urbano.
          </p>
        </article>
      </div>
    </div>
  );
}

export default AvilaMountainHero;
