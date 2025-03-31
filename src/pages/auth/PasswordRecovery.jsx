import React, { useState } from "react";
import { Link } from "react-router-dom";
import global from "../../global.module.css";
import image from "../../assets/montana-login.png";
import "./LoginSignup.css";

// Importación de módulos de Firebase
import appFirebase from "../../../credenciales";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Por favor, ingrese su correo electrónico.");
      return;
    }

    try {
      setLoading(true);

      // Verificar si el correo existe en la base de datos
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No existe una cuenta asociada a este correo electrónico.");
        setLoading(false);
        return;
      }

      // Enviar correo de recuperación de contraseña
      await sendPasswordResetEmail(auth, email);
      setSuccess("Se ha enviado un correo de recuperación de contraseña. Por favor, revise su bandeja de entrada.");
      setEmail("");
    } catch (error) {
      console.error(error);
      setError("Ha ocurrido un error. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="pageWrapper">
      <div className="container">
        <h1>Recuperación de Contraseña</h1>
        <div className="login-box recovery">
          <h2>Ingrese su correo electrónico</h2>
          <form onSubmit={handlePasswordRecovery} onChange={() => setError("")}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={global.input_field}
              type="email"
              placeholder="Email"
              id="email"
            />
            <button className='boton-recovery' type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Recuperar Contraseña"}
            </button>
          </form>
          <p>
            ¿Recordaste tu contraseña? <Link to="/login">Iniciar Sesión</Link>
          </p>
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
      <div className="image-container">
        <img src={image} alt="Montaña" className="image_mountain" />
      </div>
      </div>
    </>
  );
};

export default PasswordRecovery;