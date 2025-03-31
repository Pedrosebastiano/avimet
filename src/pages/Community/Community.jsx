import React, { useEffect, useState, useContext } from 'react';
import styles from './Community.module.css';
import ViewUser from '../../components/ViewUser/ViewUser';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../credenciales";
import { UserContext } from '../../context/UserContext';
//import withAuthorization from '../WithAuthorization';

const Community = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [guias, setGuias] = useState([]);
    const { logged, profile } = useContext(UserContext);


    useEffect(() => {
        fetchUsers();
    }, [logged, profile]);


    const fetchUsers = async () => {
        const estudiantesList = [];
        const guiasList = [];
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.userType === 'estudiante') {
                    estudiantesList.push(userData);
                } else if (userData.userType === 'guia') {
                    guiasList.push(userData);
                }
            });
            setEstudiantes(estudiantesList);
            setGuias(guiasList);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, "users", userId));
            console.log(`User with ID ${userId} deleted successfully`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    const changeType = async (userId, newType) => {
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { userType: newType });
            console.log(`User with ID ${userId} updated to ${newType} successfully`);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user type: ", error);
        }
    };
    
    return (
        <div className={styles.container}>
            <h1> Comunidad </h1>
            <div className={styles.content}>
                <div className={styles.guides}>

                    <div className = {styles.top}> 
                        <h2> Guias </h2>
                        <p> {guias.length === 0 ? 'No hay guias registrados' : 'Guias: ' + guias.length} </p>
                    </div>
                    
                    <div className={styles.userView}>
                        {guias.map((guide, index) => (
                            <ViewUser 
                                key={index} 
                                userProfile={guide} 
                                onDelete={() => deleteUser(guide.uid)} 
                                onChangeType={() => changeType(guide.uid, 'estudiante')}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.students}>
                    <div className = {styles.top}> 
                        <h2> Estudiantes </h2>
                        <p> {estudiantes.length === 0 ? 'No hay estudiantes registrados' : 'Estudiantes: ' + estudiantes.length} </p>
                    </div>
                    
                    <div className={styles.userView}>
                        {estudiantes.map((student, index) => (
                            <ViewUser 
                                key={index} 
                                userProfile={student} 
                                onDelete={() => deleteUser(student.uid)} 
                                onChangeType={() => changeType(student.uid, 'guia')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

//const AuthorizedCommunity = withAuthorization(Community, ['admin']);
export default Community;