import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import global from "../../global.module.css";
import default_picture from "../../assets/no-profile-picture.png";
import ReadModifyInput from '../../components/ReadModifyInput/ReadModifyInput';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import {supabaseProfiles, db} from "../../../credenciales";
import {doc, updateDoc, query, where, collection, getDocs} from "firebase/firestore";
import TarjetaDestinos from "../../components/TarjetaDestinos/TarjetaDestinos";
import { getUserReservations, getDestinationById } from '../../services/reservationService';

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Profile() {
    const { profile, logged } = useContext(UserContext);
    const navigation = useNavigate();
    const phoneRegex = /^\+58-\d{4}-\d{3}-\d{4}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@correo\.unimet\.edu\.ve$/;

    const [linkToVisible, setLinkToVisible] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [editable, setEditable] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(profile.name || '');
    const [email, setEmail] = useState(profile.email || '');
    const [phone, setPhone] = useState(profile.phone || '');
    const [password, setPassword] = useState(profile.password || '');
    const [profilePicture, setProfilePicture] = useState(profile.profilePicture || default_picture);
    const [focusedInput, setFocusedInput] = useState(null);
    const [error, setError] = useState("");
    const [authenticated, setAuthenticated] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadingPic, setUploadingPic] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [likedDestinations, setLikedDestinations] = useState([]);

    useEffect(() => {
        if (!logged) {
            navigation('/login');
        }

        setName(profile.name || '');
        setEmail(profile.email || '');
        setPhone(profile.phone || '');
        setPassword(profile.password || '');
        setProfilePicture(profile.profilePicture ? `${profile.profilePicture}?timestamp=${new Date().getTime()}` : default_picture);
        setLinkToVisible(false);
        setEditable(false);
        setEditPassword(false);
        setIsEditing(false);
        setPasswordVisible(false);
        console.log('Profile updated:', profile);
    }, [profile]);

    useEffect(() => {
        const fetchReservations = async () => {
            if (profile && profile.uid) {
                const reservations = await getUserReservations(profile.uid);
                console.log('User reservations:', reservations);
                setDestinations(reservations);
            }
        };
        fetchReservations();

        getLikes();

    }, [profile]);

    useEffect(() => {
        const fetchAllImages = async () => {
            const promises = destinations.map((_, index) => fetchFirstImage(index));
            await Promise.all(promises);
        };
        fetchAllImages();
    }, [destinations]);

    const fetchFirstImage = async (index) => {
        if (destinations.length > 0) {
            const firstImageUrl = await getFirstImageOfDestination(destinations[index].destinationId);
            console.log('First image URL:', firstImageUrl);
            setImageUrls(prevState => {
                const newState = [...prevState];
                newState[index] = firstImageUrl;
                return newState;
            });
            return firstImageUrl;
        } else {
            console.log('No destinations available');
        }
    };

    const getResults = () => {
        if (destinations.length > 0) {
            return (
                destinations.map((destino, index) => (
                <TarjetaDestinos
                    diseñoTarjeta={styles.destinationItem}
                    diseñoBoton={styles.destinationButton}
                    diseñoImagen={styles.destinationImage}
                    key={index}
                    imagen={imageUrls[index]}
                    titulo={destino.excursionTitle}
                    descripcion={destino.date}
                    colorClase={"lightgreen"}
                    direccion={`/destinations/${destino.destinationId}`}
                />
            )))
        } else {
            return <h1>No hay destinos disponibles</h1>;
        }
    };

    console.log(likedDestinations);

    async function getLikes() {
        const uid = profile.uid
        const docSnap = await getDocs(query(collection(db, "likes"), where("uid", "==", uid)));

        const likesList = docSnap.docs.map((doc) => ({
            ...doc.data(), 
        }));
        const dslugs = likesList.map((like) => like.dslug);
        const destDocSnap = await getDocs(query(collection(db, "destinations"), where("slug", "in", dslugs)));
        const destList = destDocSnap.docs.map((doc) => ({
            ...doc.data(), 
        }));
        if (destList.length > 0) {
            setLikedDestinations(
                destList.map((dest, index) => (
                    <TarjetaDestinos
                        diseñoTarjeta={styles.destinationItem}
                        diseñoBoton={styles.destinationButton}
                        diseñoImagen={styles.destinationImage}
                        key={index}
                        imagen={dest.images.bannerUrl}
                        titulo={dest.destination}
                        colorClase={"lightgreen"}
                        direccion={`/destinations/${dest.slug}`}
                    />
                )
            ))
        }

    }

    const getFirstImageOfDestination = async (destinationId) => {
        try {
            const destination = await getDestinationById(destinationId); // Fetch destination details from the database
            console.log('Fetched destination:', destination);
    
            if (destination && destination.images.carouselUrls && destination.images.carouselUrls.length > 0) {
                return destination.images.carouselUrls[0];
            }
            return null;
        } catch (error) {
            console.error('Error fetching destination:', error);
            return null;
        }
    };

    const handleFileChange = (event) => setFile(event.target.files[0]);

    const handleUpload = async () => {
        try {
            setUploadingPic(true);
            if (!file) {
                setError('Por favor seleccione un archivo válido.');
                setUploadingPic(false);
                return;
            }
            const fileExt = file.name.split('.').pop();
            const fileName = `${profile.uid}.${fileExt}`;
            const filePath = `${fileName}`;

            // Sobreescritura de la imagen de perfil en supabase
            let { error: uploadError } = await supabaseProfiles.storage.from('profiles').upload(filePath, file, {
                upsert: true
            });
            if (uploadError) throw uploadError;

            const { data: url } = await supabaseProfiles.storage.from('profiles').getPublicUrl(filePath);
            if (profile.uid) {
                const docRef = doc(db, 'users', profile.uid);
                await updateDoc(docRef, { profilePicture: url.publicUrl });
            }
            setProfilePicture(`${url.publicUrl}?timestamp=${new Date().getTime()}`);
            setFile(null);
            setUploadingPic(false);
        } catch (error) {
            setError(error.message);
            setUploadingPic(false);
        }
    };

    const triggerFileInput = () => document.getElementById('fileInput').click();

    const functAuthentication = async (e) => {
        e.preventDefault();
        try {
            if (password.length < 8) {
                setError('Su nueva contraseña debe contener al menos 8 caracteres.');
                return false;
            }
            if (!name || !phone || !password) {
                setError("Los campos introducidos no pueden estar vacíos");
                return false;
            }
            if (!phoneRegex.test(phone)) {
                setError("El número debe estar en el formato +58-XXXX-XXX-XXXX");
                return false;
            }
            if (!emailRegex.test(email)) {
                setError("El correo debe ser @correo.unimet.edu.ve");
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            setError(error.message);
            if (error.message.includes("auth/email-already-in-use")) {

                setError("El correo ya está en uso");
            } else if (error.message.includes("auth/network-request-failed")) {
                setError("Oops. Revise su conexión a Internet");
            } else if (error.message.includes("auth/weak-password")) {
                setError("Su contraseña debe tener por lo menos 6 carácteres");
            } else if (error.message.includes("auth/invalid-email")) {
                setError("Email invalido");
            }
            return false;
        }
    };

    const updateProfile = async () => {
        if (!profile.uid) {
            console.error('Profile ID is undefined');
            return;
        }
        try {
            const docRef = doc(db, 'users', profile.uid);
            await updateDoc(docRef, { name: name || profile.name, phone: phone || profile.phone, password: password || profile.password });
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (setFunction, input) => (event) => {
        console.log(`Updating state with value: ${event.target.value}`);
        setFocusedInput(input);
        setFunction(event.target.value);
    };

    const editAction = () => {; 
        setLinkToVisible(true);
        setEditable(true);
        if (profile.provider == 'email'){
            setEditPassword(true);
            setPasswordVisible(true);
        }
        setIsEditing(true);
        console.log('editando');
    };

    const saveData = async () => {
        const dummyEvent = { preventDefault: () => {} };
        const isAuthenticated = await functAuthentication(dummyEvent);
        if (!isAuthenticated) {
            setLinkToVisible(true);
            setEditable(true);
            setIsEditing(true);
            setAuthenticated(false);
            setEditPassword(true)
            console.log('Authentication failed, data not saved');
            return;
        }
        await updateProfile();
        setLinkToVisible(false);
        setEditable(false);
        setIsEditing(false);
        setEditPassword(false)
        setAuthenticated(true);
        setError(null);
        setPasswordVisible(false)
        console.log('guardado');
    };

    /* getFirstImageOfDestination(destinations[0]?.destinationId); */

    return (
        <div className={styles.profileContainer}>
            <h1>Perfil de usuario</h1>
            {linkToVisible && <h2>Editar perfil</h2>}
            <div className={styles.editBox}>
                <form className={styles.profileForm}>
                    <p>ㅤNombre y Apellido</p>
                    <ReadModifyInput
                        value={name}
                        define_class={styles.inputField}
                        design={global.input_field}
                        input_type='text'
                        input_placeholder={profile.name || 'Nombre y Apellido'}
                        input_id='name'
                        editing={editable}
                        onChange={handleChange(setName, 'name')}
                        shouldFocus={focusedInput === 'name'}
                        autoComplete={profile.name}
                    />
                    <p>ㅤEmail</p>
                    <ReadModifyInput
                        value={email}
                        define_class={styles.inputField}
                        design={global.input_field}
                        input_type='email'
                        input_placeholder={profile.email || 'Email'}
                        input_id='email'
                        editing={false}
                        onChange={handleChange(setEmail, 'email')}
                        shouldFocus={focusedInput === 'email'}
                        autoComplete={profile.email}
                    />
                    <p>ㅤTeléfono</p>
                    <ReadModifyInput
                        value={phone}
                        define_class={styles.inputField}
                        design={global.input_field}
                        input_type='tlf'
                        input_placeholder={profile.phone || 'Introduzca su número de teléfono'}
                        input_id='phone'
                        editing={editable}
                        onChange={handleChange(setPhone, 'phone')}
                        shouldFocus={focusedInput === 'phone'}
                        autoComplete={profile.phone}
                    />
                    <p>ㅤContraseña</p>
                    <ReadModifyInput
                        value={password}
                        define_class={styles.inputField}
                        design={styles.passwordInput}
                        input_type= {passwordVisible ? "text" : "password"}
                        input_placeholder={profile.password || 'Introduzca una nueva contraseña'}
                        input_id='password'
                        editing={editPassword}
                        onChange={handleChange(setPassword, 'password')}
                        shouldFocus={focusedInput === 'password'}
                        autoComplete={profile.password}
                    />
                </form>
                <div className={styles.pictureContainer}>
                    <img src={profilePicture} className={styles.profilePic} alt="Profile" loading="lazy" />
                    {linkToVisible && (
                        <>
                            <p className={styles.linkTo} onClick={triggerFileInput}> Cambiar foto </p>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <button className={`${global.btn1} ${styles.selectFileButton}`} onClick={handleUpload} disabled={uploadingPic}>
                                {uploadingPic ? 'Subiendo...' : 'Subir foto'}
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.disappearingButton}>
                <ToggleButton
                    design={styles.toggleButton}
                    info1='Editar perfil'
                    info2='Guardar cambios'
                    onDisappear={editAction}
                    onClick={saveData}
                    isEditing={isEditing}
                    authenticated={authenticated}
                />
                {error && <div className={styles.error}>{error}</div>}
            </div>
            <div className={styles.destinationContainer}>
                <h1 className={styles.titleVariant}>
                    <span className={styles.firstPart}>Mis</span> destinos
                </h1>
                <div className={styles.destinationBox}>
                    <div>
                        {getResults()}
                    </div>
                </div>
            </div>
            <div className={styles.destinationContainer}>
                <h1 className={styles.titleVariant}>
                    <span className={styles.firstPart}>Mis</span> favoritos
                </h1>
                <div className={styles.destinationBox}>
                    <div>
                        {likedDestinations}
                    </div>
                </div>
            </div>
        </div>
    );
}
