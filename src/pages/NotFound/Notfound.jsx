import React, {useCallback} from "react";
import styles from "./NotFound.module.css";
import iconAvila from '../../assets/mountain-icon.png';


function ErrorContainer() {
  const handleReturn = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <main className={styles.errorContainer}>
      <article className={styles.errorContent}>
        <img className={styles.imgMountain} src={iconAvila}></img>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>¡Ups! Página no encontrada</h2>
        <p className={styles.errorMessage}>
          Es posible que la página que estás buscando haya sido eliminada, haya
          cambiado de nombre o no esté disponible temporalmente. ¡Te ayudamos a
          volver a la normalidad!
        </p>
        <button
          className={styles.errorButton}
          onClick={handleReturn}
          aria-label="Regresar a la página anterior"
        >
          Regresar a la página
        </button>
      </article>
    </main>
  );
}

export default ErrorContainer;
