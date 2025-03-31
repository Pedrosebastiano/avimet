import React from "react";
import styles from "./MainCard.module.css";
import imageAvila from '../../assets/home/background-avila.jpg'

function HeroImage() {
  return (
    <img
      src={imageAvila}
      alt="Avila landscape"
      className={styles.heroImage}
    />
  );
}

export default HeroImage;