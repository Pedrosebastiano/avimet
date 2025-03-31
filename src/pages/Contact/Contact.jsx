
import React, { useState } from 'react';
import styles from './Contact.module.css';
import global from "../../global.module.css";
import emailjs from 'emailjs-com';
import CustomAlert from '../../components/common/CustomAlert';

const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setmessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: 'info' });
  const showAlert = (message, type = 'info') => {
    setAlertInfo({ show: true, message, type });
  };
  const closeAlert = () => {
    setAlertInfo({ ...alertInfo, show: false });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+58-\d{4}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificaciones de input
    if (!name || !email || !phone || !message) {
      showAlert('Por favor, complete todos los campos.', "warning");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('El formato del teléfono debe ser +58-XXXX-XXX-XXXX');
      return;
    } else {
      setPhoneError('');
    }

    // Configuración de EmailJS
    const serviceID = 'service_jx0q6sr';
    const templateID = 'template_0xkoaw9';
    const userID = 'DNTRl6Wb0k0WiF4VF';

    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      time: new Date().toLocaleString(),
      to_email: email // Agrega la dirección de correo electrónico del destinatario
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Correo enviado', response.status, response.text);
        showAlert('Formulario enviado correctamente', "warning");
        setName('');
        setEmail('');
        setPhone('');
        setmessage('');
      }, (error) => {
        console.error('Error al enviar el correo', error);
        showAlert('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.', "warning");
      });

    console.log('Formulario enviado', { name, email, phone, message });
  };

  
  return (
    <div className={styles.contactContainer}>
      <div className={styles.title}>
        <h2 className={styles.title}>
          Contáctanos <span className={styles.italicText}> Ahora</span>
        </h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className={global.input_field}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          className={global.input_field}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Número de Teléfono (+58-XXXX-XXX-XXXX)"
          className={global.input_field}
        />
        {phoneError && <p className={styles.error}>{phoneError}</p>}
        <textarea
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Solicitud"
          className={`${global.input_field} ${styles.textarea}`}
        />
        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15692.080025794812!2d-66.79628695!3d10.499088799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a576d54142307%3A0x346aa4e5e126367e!2sUniversidad%20Metropolitana!5e0!3m2!1ses!2sus!4v1742145345031!5m2!1ses!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {alertInfo.show && (
        <CustomAlert
          onClose={closeAlert}
          type={alertInfo.type}
          message={alertInfo.message}
        />
      )}
    </div>
  );
};

export default Contact;