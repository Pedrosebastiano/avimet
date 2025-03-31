import React, { useState } from "react";
import styles from "./DestinationEdit.module.css";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import {
  doc,
  deleteDoc,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";
import appFirebase from "../../../credenciales";

const db = getFirestore(appFirebase);

const DestinationEdit = ({ imagen, titulo, direccion, new: isNew, id }) => {
  const navigation = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = async () => {
    try {
      const reservationsRef = collection(db, `destinations/${id}/reservations`);
      const reservationsSnapshot = await getDocs(reservationsRef);
      const reservationsDocs = reservationsSnapshot.docs;
      if (reservationsDocs.length > 1) {
        setAlertMessage("No puedes eliminar este destino porque tiene reservas activas.");
        setShowConfirm(false);
        return;
      }
      const slugDoc = reservationsDocs[0].id;

      if (slugDoc !== direccion) {
        setAlertMessage("No puedes eliminar este destino porque tiene reservas activas.");
        setShowConfirm(false);
        return;
      }

      await deleteDoc(doc(db, "destinations", id));
      setShowConfirm(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigation("/destinations-manage");
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar el destino:", error);
      alert("Hubo un error al eliminar el destino.");
    }
  };

  return (
    <>
      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>¿Estás seguro de que deseas eliminar este destino?</h3>
            <div className={styles.modalButtons}>
              <button className={styles.confirmButton} onClick={handleDelete}>
                Sí, eliminar
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {alertMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{alertMessage}</h3>
            <button
              className={styles.cancelButton}
              onClick={() => setAlertMessage("")}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className={styles.successMessage}>Destino eliminado con éxito</div>
      )}

      {!isNew ? (
        <div className={styles.tarjetaDestino}>
          <img src={imagen} alt={titulo} className={styles.imagenDestino} />
          <div className={styles.contenidoDestino}>
            <h2 className={styles.tituloDestino}>{titulo}</h2>
            <button
              className={`btn-quaternary ${styles.btnEdit}`}
              onClick={() => navigation(direccion)}
            >
              Editar
            </button>
          </div>
          <button
            className={styles.trashButton}
            onClick={() => setShowConfirm(true)}
          >
            <TbTrash />
          </button>
        </div>
      ) : (
        <div className={styles.tarjetaDestino2}>
          <div className={styles.imagenVerde}></div>
          <div className={styles.contenidoDestino}>
            <h2 className={styles.tituloDestino}>{titulo}</h2>
            <button
              className={`btn-primary ${styles.btnEdit}`}
              onClick={() => navigation(direccion)}
            >
              Crear
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationEdit;
