import React from 'react'
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import appFirebase from '../../../../credenciales';
import DestinationForm from '../../../components/destinationForm/DestinationForm'
import styles from '../DestinationCreateEdit.module.css'

const db = getFirestore(appFirebase);

export default function DestinationCreate() {
    const [guides, setGuides] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {

        async function getGuides() {
            
            const guidesDocRef = query(collection(db, "users"), where("userType", "==", "guia"));
            
            const docSnap = await getDocs(guidesDocRef);
    
            const guidesList = docSnap.docs.map((doc) => ({
                ...doc.data(), 
              }));
    
            setGuides(guidesList);
            
        }
        
        async function getCategories() {
            
            const categoriesDocRef = collection(db, "tags");
            
            const docSnap = await getDocs(categoriesDocRef);
            
            const categoriesList = docSnap.docs.map((doc) => ({
                ...doc.data(), 
            }));
    
            setCategories(categoriesList);
    
        }


        getGuides();
        getCategories();
    }, []);
    
    return(
    <div className={styles.container}>
        <h1 className={styles.title}>Crear <span className={styles.secondPart}>Destino</span></h1>
        <DestinationForm
            new={true}
            guides={guides ?? []}
            categories={categories ?? []}
        />
    </div>
    )
}