import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import styles from './BookingPage.module.css';
import CommentBox from "../../components/commentSection/CommentBox";
import Calendario from '../Calendario/Calendario';
import PayPalButton from './PayPalButton'; 
import { saveReservation } from '../../services/reservationService';
import { UserContext } from "../../context/UserContext";
import appFirebase from "../../../credenciales";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import CustomAlert from '../common/CustomAlert';


const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { titulo, subtitulo, estimatedTime, image, guide, descriptionTitle, dateDisponible, slug } = location.state;
  const [selectedDate, setSelectedDate] = useState('');
  const [price, setPrice] = useState(10);
  const [showPaypal, setShowPaypal] = useState(false);
  const { logged, profile } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const db = getFirestore(appFirebase);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: 'info' });
  const showAlert = (message, type = 'info') => {
    setAlertInfo({ show: true, message, type });
  };
  const closeAlert = () => {
    setAlertInfo({ ...alertInfo, show: false });
  };
  const [lastConfirmedPrice, setLastConfirmedPrice] = useState(null);
  const [lastConfirmedDate, setLastConfirmedDate] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (logged && profile.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", profile.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [logged, profile, db]);

  const handleConfirmReservation = useCallback(() => {
    if (!logged) {
      navigate("/Login");
      return;
    }

    if (!selectedDate) {
      showAlert("Por favor selecciona una fecha antes de confirmar la reserva.", "warning");
      return;
    }

    showAlert(`Datos de la excursion que vas a reservar: "${titulo}" para la fecha ${selectedDate} por un monto de US$ ${price.toFixed(2)}`);
    setShowPaypal(true);
    setLastConfirmedPrice(price);
    setLastConfirmedDate(selectedDate);
  }, [logged, navigate, selectedDate, showAlert, titulo, price]);

  useEffect(() => {
    if (price !== lastConfirmedPrice || selectedDate !== lastConfirmedDate) {
      setShowPaypal(false);
    }
  }, [price, selectedDate, lastConfirmedPrice, lastConfirmedDate]);

  // eslint-disable-next-line no-unused-vars
  const handlePaymentSuccess = (details, data) => {
  console.log('Payment completed successfully. Payment details:', details);

  const facturaData = {
    date: selectedDate,
    excursionTitle: titulo,
    price: price,
    userEmail: userData?.email || profile.email,
    userId: profile.uid,
    userName: userData?.name || profile.name,
    excursionId: slug,
    paymentDetails: {
      create_time: details.create_time,
      id: details.id,
      status: details.status,
      intent: details.intent,
      payer: details.payer,
      links: details.links,
      update_time: details.update_time,
      transactionId: details.id,
      payerEmail: details.payer.email_address,
    }
  };

  saveReservation(facturaData);

  // Redirigir a la página de factura
  navigate('/factura', { state: facturaData });
    setShowPaypal(false);
    setSelectedDate('');
  };


  return (
    <PayPalScriptProvider options={{ "client-id": "ARv2vziyGxOho1ArMXZ3p0yB1pHtaFLSQAGnhyzLrp3OGfMJnjzNXQYnPW9rLXDK4r7agi1f7KiWtjAp", "currency": "USD" }}>
    <div className={styles.bookingPage}>
        <div className={styles.titleSection}>
          <h2 className={styles.carouselTitle}>
            Reserva <span className={styles.italicText}> tu experiencia</span>
          </h2>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.bookingCard}>
            {/* Header con imagen y títulos */}
            <div className={styles.headerSection}>
              <img src={image} alt={titulo} className={styles.destinationImage} />
              
              <div className={styles.titleSection}>
                <h1>{titulo}</h1>
                <p>Guía: {guide}</p>
              </div>
            </div>

            {/* Detalle de la ruta */}
            <div className={styles.detailsSection}>
              <div className={styles.detailsRow}>
                <h3>Ruta - {subtitulo}</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    const newPrice = Math.max(0, Number(e.target.value));
                    setPrice(newPrice);
                  }}
                  className={styles.priceInput}
                />
              </div>
              <p style={{ marginTop: '0.5rem', color: '#666' }}>{estimatedTime}</p>
            </div>

            {/* Total */}
            <div className={styles.totalSection}>
              <span>Total</span>
              <span>US$ {price.toFixed(2)}</span>
            </div>

            {/* Botón de reserva */}
            <div style={{ padding: '1rem' }}>
              {!showPaypal ? (
                <button
                  className={styles.bookButton}
                  onClick={handleConfirmReservation}
                >
                  Confirmar reserva
                </button>
              ) : (
                <PayPalButton
                  amount={price}
                  onSuccess={handlePaymentSuccess}
                />
              )}
              {/* Show the comment box only when the PayPal buttons are not visible */}
              {!showPaypal && (
                <div className={styles.commentsSection}>
                  <CommentBox destino={descriptionTitle} />
                </div>
              )}
            </div>
          </div>
          {/* Calendario */}
          <div className={styles.calendarSection}>
            <h3>Selecciona una fecha:</h3>
            <Calendario
              onSelectDate={(date) => setSelectedDate(date)}
              markedDates={dateDisponible} 
            />

            {selectedDate && (
              <p style={{ marginTop: '1rem' }}>
              </p>
            )}
          </div>
        </div>
      </div>
      {alertInfo.show && (
        <CustomAlert
          onClose={closeAlert}
          type={alertInfo.type}
          message={alertInfo.message}
        />
      )}
    </PayPalScriptProvider>
  );
};

export default BookingPage;