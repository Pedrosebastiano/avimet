import React from 'react'
import DestinationForm from '../../../components/destinationForm/DestinationForm'
import { useParams } from 'react-router-dom'
import appFirebase from "../../../../credenciales";
import { doc, getDoc, getFirestore, query, collection, where, getDocs } from "firebase/firestore";
import styles from '../DestinationCreateEdit.module.css'

const db = getFirestore(appFirebase);

export default function DestinationEdit() {
    const params = useParams()
    const [destination, setDestination] = React.useState(null);
    const [guides, setGuides] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [filters, setFilters] = React.useState([]);

    async function getDestination() {
        
        const destinationDocRef = doc(db, "destinations", params.slug);
        
        const docSnap = await getDoc(destinationDocRef);
        
        const data = docSnap.data()
        
        setDestination(data)

    }

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

                async function getFilters() {
                    
                    const filtersDocRef = collection(db, "filtrospordestino");
                    
                    const docSnap = await getDocs(filtersDocRef);
                    
                    const filtersList = docSnap.docs.map((doc) => ({
                        ...doc.data(), 
                    }));
            
                    setFilters(filtersList);
            
                }

            getFilters()
            getGuides();
            getCategories();
        }, []);

    React.useEffect(() => {
        getDestination()
    }, [params]);

    return(
    <div className={styles.container}>
        <h1 className={styles.title}>Editar <span className={styles.secondPart}>Destino</span></h1>
        <DestinationForm
            new={false}
            destinationObject={destination}
            guides={guides ?? []}
            categories={categories ?? []}
            filters={filters ?? []}
        />
    </div>
    )
}