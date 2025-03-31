import React, { useState, useContext} from 'react';
import styles from './Postulacion.module.css'; // Importamos los estilos
import { collection, query, where, getDocs } from "firebase/firestore";
import appFirebase from "../../../credenciales";
import { getFirestore } from "firebase/firestore";
import emailjs from 'emailjs-com'; 
import { UserContext } from '../../context/UserContext';
import CustomAlert from '../common/CustomAlert';


const db = getFirestore(appFirebase);

const Postulacion = ({ NombreDest }) => {
  const { profile } = useContext(UserContext); // Destructure profile from UserContext
  const role = profile ? profile["userType"] : null; // Ensure profile exists before accessing userType
  const name = profile ? profile["name"] : null; // Ensure profile exists before accessing userType
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: 'info' });
  const showAlert = (message, type = 'info') => {
    setAlertInfo({ show: true, message, type });
  };
  const closeAlert = () => {
    setAlertInfo({ ...alertInfo, show: false });
  };

  const serviceID = 'wejfverijvfwoeirjfjrkqvw'; // Replace with your EmailJS service ID
  const templateID = 'template_57a9632'; // Replace with your EmailJS template ID
  const userID = 'EpWodUNXN2HZHuy6Y'; // Replace with your EmailJS user ID

  const templateParams = {
    name: name,
    email: "", // Se actualizará con el correo del admin
    message: `El usuario ${name} desea ser el guía designado de la ruta ${NombreDest}`,
    time: new Date().toLocaleString(),
  };

  // Función que se ejecuta al hacer clic en el botón
  const handleClick = async () => {
    const itemsRef = collection(db, "users");
    const q = query(itemsRef, where("userType", "==", "admin")); // Busca usuarios con userType "admin"

    try {
      const querySnapshot = await getDocs(q);
      const emails = []; // Array para almacenar los correos de los administradores

      querySnapshot.forEach((doc) => {
        const adminEmail = doc.data().email;
        emails.push(adminEmail); // Agrega el correo del admin al array

        // Envía un correo a cada administrador
        templateParams.email = doc.data().email;
        emailjs.send(serviceID, templateID, templateParams, userID)
          .then((result) => {
            console.log(result.text);
            showAlert('Correo enviado con éxito!', "warning");
          }, (error) => {
            console.log(error.text);
            showAlert('Hubo un error al enviar el correo.', "warning");
          });
      });

      console.log("Correos de administradores:", emails);
    } catch (error) {
      console.error("Error al obtener documentos: ", error);
    }
  };

  // Renderiza el botón solo si el rol es "guia"
  if (role !== "guia") {
    console.log("No");
    console.log(role);
    return null; // No renderiza nada si el rol no es "guia"
  } else{
    console.log("si");
  }

  return (
    <div>
    <button
      className={styles.postulacion_button } // Aplicamos la clase CSS
      onClick={handleClick} // Asignamos la función al evento onClick
    >
      Sé un guía!
    </button>
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

export default Postulacion;