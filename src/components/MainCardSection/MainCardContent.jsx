import React from "react";
import styles from "./MainCard.module.css";
import {useNavigate } from "react-router-dom";

function HeroContent() {
    const navigation = useNavigate();
  return (
    <article className={styles.textContent}>
      <h2 className={styles.subtitle}>Explora tus destinos favoritos</h2>
      <h1 className={styles.title}>
        <span className={styles.en}>en </span>
        <span className={styles.avila}>El Ávila</span>
      </h1>
      <button className={styles.ctaButton} onClick={() => navigation("/destinations")} >Empieza la aventura</button>
    </article>
  );
}

export default HeroContent;