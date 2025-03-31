import React from "react";
import HeroContent from "./MainCardContent";
import HeroImage from "./MainCardImage";
import styles from "./MainCard.module.css";

function HeroSection() {
  return (
    <>
      <section className={styles.heroSection}>
        <HeroContent />
        <HeroImage />
      </section>
    </>
  );
}

export default HeroSection;