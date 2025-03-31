import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import appFirebase from "../../credenciales";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import DestinationHeader from '../components/destination/DestinationHeader';
import MapBanner from '../components/destination/MapBanner';
import DestinationCarousel from '../components/destination/DestinationCarousel';
import InfoSection from '../components/destination/InfoSection';

const db = getFirestore(appFirebase);

export default function Destination() {
    const params = useParams()
    const [destination, setDestination] = useState(null)

    async function getDestination() {
        
        const userDocRef = doc(db, "destinations", params.slug);
        
        const docSnap = await getDoc(userDocRef);
        
        const data = docSnap.data()
        
        setDestination(data)

    }

    useEffect(() => {
        getDestination()
    }, [params])

    if (destination)
        return (
            <div>
                <DestinationHeader 
                    image={destination?.images.bannerUrl}
                    titulo={destination?.destination}
                    subtitulo={destination?.title} 
                    estimatedTime={destination?.estimatedTime}
                    difficulty={destination?.difficulty}
                    distance={destination?.distance}
                    guide={destination?.routeGuide}
                    descriptionTitle={destination?.descriptionTitle}
                    dateDisponible={destination?.dateDisponible}
                    slug={destination?.slug}
                />
                <MapBanner
                    image={destination?.images.mapUrl}
                    destination={destination?.destination}
                    estimatedTime={destination?.estimatedTime}
                    difficulty={destination?.difficulty}
                    distance={destination?.distance}
                />
                <DestinationCarousel
                    images={destination?.images.carouselUrls}
                />
                <InfoSection
                    descriptionTitle={destination?.descriptionTitle}
                    description={destination?.description}
                    descriptionImage={destination?.images.descriptionUrl}
                    guide={destination?.routeGuide}
                    guideDescription={destination?.routeGuideDescription}
                    guideImage={destination?.images.guideUrl}
                />
            </div>        
        )
}