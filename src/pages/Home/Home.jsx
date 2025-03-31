import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

import MainCard from "../../components/MainCardSection/MainCardSection";
import AvilaMountain from "../../components/AvilaMountain/AvilaMountain";
import TarjetaDestinos, {
  destinosData,
} from "../../components/TarjetaDestinos/TarjetaDestinos";
import VisionMissionSection from "../../components/VisionMissionSection/VisionMissionSection";

const Home = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container1}>
          <MainCard />
        </div>
        <div className={styles.container2}>
          <AvilaMountain />
        </div>
        <div className={styles.container3}>
          <h1 className={styles.title}>
            Explora los <span className={styles.titleMiddle}>destinos</span>{" "}
            <br />
            más populares de la montaña
          </h1>

          {destinosData.map((destino, index) => (
            <TarjetaDestinos
              key={index}
              imagen={destino.imagen}
              titulo={destino.titulo}
              descripcion={destino.descripcion}
              colorClase={destino.colorClase}
              direccion={destino.direccion}
            />
          ))}
          <Link to="/destinations" className={styles.viewMore}>
            <a className={styles.linkViewMore} >ver más destinos</a>
          </Link>
        </div>
        <div className={styles.container3}>
          <VisionMissionSection />
        </div>
  
      </div>
    </>
  );
};

export default Home;
