import React from 'react';
import styles from './CustomAlert.module.css';

const CustomAlert = ({ message, onClose, type = 'info' }) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.alertBox} ${styles[type]}`}>
        <div className={styles.alertContent}>
          <p>{message}</p>
          <button onClick={onClose} className={styles.closeButton}>Continuar</button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;