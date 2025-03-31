import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import global from "../../global.module.css";
import image from "../../assets/montana-login.png";
import googleLogo from "../../assets/google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginSignup.css";

//importacion de modulos de firebase
import appFirebase from "../../../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

import {
  authProviders,
  providerGoogle,
} from "../../../credenciales";
import { signInWithPopup } from "firebase/auth";


const googleSignUp = async () => {
  const googleUser = await signInWithPopup(authProviders, providerGoogle);
  return googleUser;
};

const SignUp = () => {
  const phoneRegex = /^\+58-\d{4}-\d{3}-\d{4}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@correo\.unimet\.edu\.ve$/;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const functAuthentication = async (e) => {
    e.preventDefault();
    try {
      if ((name, phone, password, confirmPassword == "")) {
        setError("Complete todos los campos solicitados");
        return;
      }
      if (!phoneRegex.test(phone)) {
        setError("El número debe estar en el formato +58-XXXX-XXX-XXXX");
        return;
      }
      if (password != confirmPassword) {
        setError("Validación de contraseña inválida");
        return;
      }
      if (!emailRegex.test(email)) {
        setError("El correo debe ser @correo.unimet.edu.ve");
        return;
      }

      setLoading(true);
      const nameRegister = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", nameRegister.user.uid), {
        name: name,
        email: email,
        password: password,
        phone: phone,
        profilePicture: null,
        userType: 'estudiante',
        destinations: [],
        uid: nameRegister.user.uid,
        creationDate: new Date(),
        provider: "email",
      });
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      navigation("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.message);

      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setError("El correo ya está en uso");
      } else if (
        error.message == "Firebase: Error (auth/network-request-failed)."
      ) {
        setError("Opss. Revise su conexión a Internet");
      } else if (
        error.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("Su contraseña debe tener por lo menos 6 carácteres");
      } else if (error.message == "Firebase: Error (auth/invalid-email).") {
        setError("Email invalido");
      }
    }
  };


  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const googleUser = await googleSignUp();
      const userDoc = await getDoc(doc(db, "users", googleUser.user.uid));
      if (userDoc.exists()) {
        setError("El usuario ya está registrado. Por favor, inicie sesión.");
        await auth.signOut();
      } else {
        await setDoc(doc(db, "users", googleUser.user.uid), {
          name: googleUser.user.displayName,
          email: googleUser.user.email,
          password: 'googleSignIn',
          phone: googleUser.user.phoneNumber || 'Número de teléfono no registrado',
          profilePicture: null,
          userType: 'estudiante',
          destinations: [],
          uid: googleUser.user.uid,
          creationDate: new Date(),
          provider: "google",
          
        });
        navigation("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <h1>Regístrate y sé un aventurero más</h1>
        <div className="login-box">
          <h2>Crear Usuario</h2>
          <form onSubmit={functAuthentication} onChange={() => setError("")}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={global.input_field}
              type="text"
              placeholder="Nombre y Apellido"
              id="name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={global.input_field}
              type="email"
              placeholder="Email"
              id="email"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={global.input_field}
              type="tlf"
              placeholder="Teléfono"
              id="phone"
            />
            <div className="input-wrapper">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={global.password_input}
                type={passwordVisible ? "text" : "password"}
                placeholder="Contraseña (min. 8 caracteres)"
                id="password"
              />
              <span
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input-wrapper">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={global.password_input}
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Repetir contraseña"
                id="confirm-password"
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button className="btn-primary auth-btn" type="submit">
              Crear Cuenta
            </button>
          </form>
          <div className="social-login">
            <button className="btn-secondary auth-btn social-auth-btn" onClick={handleGoogleSignUp}>
              <img src={googleLogo} alt="Google" className="icon" />
              Registrarse con Google
            </button>
          </div>
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
          </p>
        </div>
        {loading && <div className="loading">Cargando...</div>}
        {error && <div className="error">{error}</div>}
      </div>
      <div className="image-container">
        <img src={image} alt="Montaña" className="image_mountain" />
      </div>
    </div>
  );
};

export default SignUp;
