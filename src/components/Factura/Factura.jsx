import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Factura.module.css';

const Factura = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const factura = location.state;

  if (!factura) {
    return (
      <div className={styles.container}>
        <h2>No hay datos para mostrar.</h2>
      </div>
    );
  }

  const {
    date, // fecha de la excursión
    excursionTitle,
    price,
    userEmail,
    userId,
    userName,
    paymentDetails
  } = factura;

  return (
    <div className={styles.facturaContainer}>
      <div className={styles.title}>
          <h2 className={styles.title}>
            TRANSACCIÓN <span className={styles.italicText}> EXITOSA</span>
          </h2>
        </div>
      
      <div className={styles.checkIcon}>
        ✓
      </div>

      <div className={styles.facturaBox}>
        <div className={styles.row}>
          <span>Estado de Transacción</span>
          <span>{paymentDetails.status}</span>
        </div>

        <div className={styles.row}>
          <span>Nombre del Comercio</span>
          <span>AVIMET C.A</span>
        </div>

        <div className={styles.row}>
          <span>Fecha de Pago</span>
          <span>{new Date(paymentDetails.create_time).toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}</span>
        </div>

        <div className={styles.row}>
          <span>Hora de Pago</span>
          <span>{new Date(paymentDetails.create_time).toLocaleTimeString('es-ES')}</span>
        </div>

        <div className={styles.row}>
          <span>ID de la Transacción</span>
          <span>#{paymentDetails.transactionId}</span>
        </div>

        <div className={styles.row}>
          <span>CUS</span>
          <span>{paymentDetails.payer.payer_id}</span>
        </div>

        <div className={styles.row}>
          <span>Concepto</span>
          <span>{excursionTitle}</span>
        </div>

        <div className={styles.row}>
          <span>Método de Pago</span>
          <span>PayPal</span>
        </div>

        <div className={styles.row}>
          <span>Costo Subtotal</span>
          <span>US$ {price.toFixed(2)}</span>
        </div>

        <div className={styles.row}>
          <span>Fecha de la Excursión</span>
          <span>{date}</span>
        </div>

        <div className={styles.row}>
          <span>Email del Usuario</span>
          <span>{userEmail}</span>
        </div>

        <div className={styles.rowTotal}>
          <span>Total</span>
          <span>US$ {price.toFixed(2)}</span>
        </div>
      </div>

      <button className={styles.finalizarButton} onClick={() => navigate('/')}>
        Finalizar
      </button>
    </div>
  );
};

export default Factura;