import React from 'react'
import styles from './DestinationForm.module.css'
import global from "../../global.module.css";
import { useState } from 'react';
import ImageInput from '../imageInput/ImageInput';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';
import appFirebase, { supabaseProfiles } from '../../../credenciales';
import { getFirestore } from 'firebase/firestore';
import {v4 as uuidv4} from "uuid";
import { useNavigate } from 'react-router-dom';


const db = getFirestore(appFirebase);

const supabase = supabaseProfiles;

export default function DestinationForm( { new: isNew, destinationObject, guides = [], categories = [], filters = []} ) {
    const [destination, setDestination] = useState("");
    const [title, setTitle] = useState("");
    const [distance, setDistance] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [descriptionTitle, setDescriptionTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");
    const [routeGuide, setRouteGuide] = useState("");
    const [description, setDescription] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [mapImage, setMapImage] = useState("");
    const [descriptionImage, setDescriptionImage] = useState("");
    const [carouselImage1, setCarouselImage1] = useState("");
    const [carouselImage2, setCarouselImage2] = useState("");
    const [carouselImage3, setCarouselImage3] = useState("");
    const [carouselImage4, setCarouselImage4] = useState("");
    const navigation = useNavigate();


    React.useEffect(() => {
        if (destinationObject) {
            setDestination(destinationObject.destination);
            setTitle(destinationObject.title)
            setDistance(destinationObject.distance);
            setEstimatedTime(destinationObject.estimatedTime)
            setDescriptionTitle(destinationObject.descriptionTitle);
            setDescription(destinationObject.description)
            setMainImage(destinationObject.images.bannerUrl)
            setMapImage(destinationObject.images.mapUrl)
            setDescriptionImage(destinationObject.images.descriptionUrl)
            setCarouselImage1(destinationObject.images.carouselUrls[0])
            setCarouselImage2(destinationObject.images.carouselUrls[1])
            setCarouselImage3(destinationObject.images.carouselUrls[2])
            setCarouselImage4(destinationObject.images.carouselUrls[3])
        }
    }, [destinationObject]);

    function getGuide(guide) {
        if (guide.uid == routeGuide) {
            return guide
        }
    }

    async function handleAddDestination(e) {
        e.preventDefault();
        if (!destination.trim() || !title.trim() || !distance.trim() || !estimatedTime.trim() || !description.trim() || !descriptionTitle.trim() || !mainImage || !mapImage || !descriptionImage || !carouselImage1 || !carouselImage2 || !carouselImage3 || !carouselImage4) {
            alert('Todos los cambos deben estar llenos')
            return;
          }
        try {
            const images = [mainImage, mapImage, descriptionImage, carouselImage1, carouselImage2, carouselImage3, carouselImage4]
            const guide = guides.filter(getGuide)[0]
            if (!destinationObject) {
                const newId = destination.trim().toLowerCase().replace(" ", "-");
                const imgs = await handleImages(newId, images)
                const resp = await setDoc(doc(db, "destinations", newId), {
                    destination: destination,
                    title: title,
                    distance: distance,
                    description: description,
                    dateDisponible: "['Enero 7', 'Febrero 14', 'Marzo 25', 'Abril 4', 'Mayo 19', 'Junio 10', 'Julio 22', 'Agosto 5', 'Septiembre 28', 'Octubre 13', 'Noviembre 3', 'Diciembre 26', 'Enero 18', 'Febrero 9', 'Marzo 30', 'Abril 11', 'Mayo 6', 'Junio 24', 'Julio 1', 'Agosto 15', 'Septiembre 8', 'Octubre 20', 'Noviembre 17', 'Diciembre 2', 'Enero 29', 'Febrero 22', 'Marzo 12', 'Abril 17', 'Mayo 27', 'Junio 15']",
                    estimatedTime: estimatedTime,
                    descriptionTitle: descriptionTitle,
                    difficulty: difficulty,
                    routeGuide: guide.name,
                    routeGuideDescription: "",
                    slug: newId,
                    images: {
                        bannerUrl: imgs[0],
                        descriptionUrl: imgs[1],
                        mapUrl: imgs[2],
                        guideUrl: guide.profilePicture,
                        carouselUrls: [
                            imgs[3],
                            imgs[4],
                            imgs[5],
                            imgs[6]
                        ]
                    }
                });
                handleCategories(newId)
                handleAddReservationCollection(newId)
            } else {
                const imgs = await handleImages(destinationObject.slug, images)
                const resp = await setDoc(doc(db, "destinations", destinationObject.slug), {
                    destination: destination,
                    title: title,
                    distance: distance,
                    description: description,
                    estimatedTime: estimatedTime,
                    descriptionTitle: descriptionTitle,
                    dateDisponible: "['Enero 7', 'Febrero 14', 'Marzo 25', 'Abril 4', 'Mayo 19', 'Junio 10', 'Julio 22', 'Agosto 5', 'Septiembre 28', 'Octubre 13', 'Noviembre 3', 'Diciembre 26', 'Enero 18', 'Febrero 9', 'Marzo 30', 'Abril 11', 'Mayo 6', 'Junio 24', 'Julio 1', 'Agosto 15', 'Septiembre 8', 'Octubre 20', 'Noviembre 17', 'Diciembre 2', 'Enero 29', 'Febrero 22', 'Marzo 12', 'Abril 17', 'Mayo 27', 'Junio 15']",
                    difficulty: difficulty,
                    routeGuide: guide.name,
                    routeGuideDescription: "",
                    slug: destinationObject.slug,
                    images: {
                        bannerUrl: imgs[0],
                        descriptionUrl: imgs[1],
                        mapUrl: imgs[2],
                        guideUrl: guide.profilePicture,
                        carouselUrls: [
                            imgs[3],
                            imgs[4],
                            imgs[5],
                            imgs[6]
                        ]
                    }
                });
                handleCategories(destinationObject.slug)
            }
            navigation('/destinations-manage')
            
        } catch (error) {
            console.log(error)
        }
        
    }
        
    function notDifficulty(cat) {
        if (cat.nombre != 'Fácil' && cat.nombre != 'Intermedio' && cat.nombre != 'Difícil'){
            return cat;
        }
    }

    async function handleImages(dId, images) {
        if (!destinationObject) {
            images.map(async(image) => {
                const path = `${image.name}`
                const { data, error} = await supabase.storage.from('destinations').upload(dId + '/' + path, image);
            }
            )
        } else {
            images.map(async(image) => {
                const path = `${image.name}`
                const { data, error} = await supabase.storage.from('destinations').update(dId + '/' + path, image)
            }
            )
        }
        return await setImages(dId, images)
    }

    async function setImages(dId, images) {
        const urlList = []

        await Promise.all(
            images.map(async (image) => {
                if (typeof image != 'string') {        
                    const { data, error } = await supabase.storage
                    .from('destinations')
                    .getPublicUrl(dId + '/' + image.name, image);
            
                    if (error) {
                        console.error("Error getting public URL:", error);
                        return;
                    }
                    urlList.push(data.publicUrl);
                } else {
                    urlList.push(image);
                }
            })
        );

        setMainImage(urlList[0])
        setMapImage(urlList[1])
        setDescriptionImage(urlList[2])
        setCarouselImage1(urlList[3])
        setCarouselImage2(urlList[4])
        setCarouselImage3(urlList[5])
        setCarouselImage4(urlList[6])

        return urlList
            
    }

    function handleAddReservationCollection(dId) {
        const docRef = doc(db, 'destinations', dId)
        const reservationCollection = collection(docRef, 'reservations')
        addDoc(reservationCollection, { destinationSlug: dId })
    }

    async function handleCategories(dId) {
        const filterId = uuidv4();
        const altFilterId = uuidv4();


        const selectedFilters = filters.filter((filter) => filter.dest == dId);

        if (selectedFilters.length > 0) {
            selectedFilters.map(async (selectedFilter) => {
                if (selectedFilter.tag != 'Difícil' && selectedFilter.tag != 'Intermedio' && selectedFilter.tag != 'Fácil' && selectedFilter.tag != category) {
                    await setDoc(doc(db, "filtrospordestino", selectedFilter.dest), {
                        dest: selectedFilter.dest,
                        tag: category
                    });
                } else if ((selectedFilter.tag == 'Difícil' || selectedFilter.tag == 'Intermedio' || selectedFilter.tag == 'Fácil') && selectedFilter.tag != difficulty) {
                    await setDoc(doc(db, "filtrospordestino", selectedFilter.dest), {
                        dest: selectedFilter.dest,
                        tag: difficulty
                    });                    
                }
            })
        } else {
            await setDoc(doc(db, "filtrospordestino", filterId), {
                dest: dId,
                tag: category
            });
            await setDoc(doc(db, "filtrospordestino", altFilterId), {
                dest: dId,
                tag: difficulty
            });
        }
    }


    return(
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleAddDestination}>
                <div className={styles.inputContainer}>
                    <div className={styles.textInputs}>
                        <label className={styles.label}>
                            Nombre del Destino
                        </label>
                        <input
                            className={global.input_field}
                            type="text"
                            placeholder='Nombre del Destino'
                            maxLength={20}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            disabled={!isNew}
                        />
                        <label className={styles.label}>
                            Titulo de Página
                        </label>
                        <input
                            className={global.input_field}
                            type="text"
                            placeholder='Titulo de Página'
                            maxLength={35}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className={styles.abtInputs}>
                            <div className={styles.abtInputs}>
                                <div className={styles.labelInput}>
                                    <label className={styles.label}>
                                        Distancia
                                    </label>
                                    <input
                                        className={`${global.input_field} ${styles.abt}`}
                                        type="text"
                                        placeholder='XX,X km'
                                        maxLength={7}
                                        value={distance}
                                        onChange={(e) => setDistance(e.target.value)}
                                    />
                                </div>
                                <div className={styles.labelInput}>
                                    <label className={styles.label}>
                                        Duración
                                    </label>
                                    <input
                                        className={`${global.input_field} ${styles.abt}`}
                                        type="text"
                                        placeholder='XX h XX min'
                                        maxLength={12}
                                        value={estimatedTime}
                                        onChange={(e) => setEstimatedTime(e.target.value)}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <label className={styles.label}>
                                    Dificultad
                                </label>
                                <select className={`${styles.selector} ${styles.difficulty}`} required onChange={(e) => setDifficulty(e.target.value)}>
                                    <option key={1} value={'Fácil'}>Fácil</option>
                                    <option key={2} value={'Intermedio'}>Intermedio</option>
                                    <option key={3} value={'Difícil'}>Difícil</option>
                                </select>
                            </div>
                        </div>
                        <label className={styles.label}>
                            Guía de Ruta
                        </label>
                        <select className={styles.selector} required onChange={(e) => setRouteGuide(e.target.value)}>
                            <option key={0} value={null}>Seleccione un guía</option>
                            {guides?.map((guide) => (
                                <option key={guide.uid} value={guide.uid}>{guide.name}</option>
                            ))}
                        </select>
                        <label className={styles.label}>
                                Categoría
                        </label>
                        <select className={styles.selector} required onChange={(e) => setCategory(e.target.value)}>
                            <option key={0} value={null}>Seleccione una categoría</option>
                            {categories?.filter(notDifficulty)?.map((category) => (
                                <option key={category.nombre} value={category.nombre}>{category.nombre}</option>
                            ))}
                        </select>
                        <label className={styles.label}>
                                Título de la Descripción
                        </label>
                        <input
                            className={global.input_field}
                            type="text"
                            placeholder='Título de la Descripción'
                            maxLength={25}
                            value={descriptionTitle}
                            onChange={(e) => setDescriptionTitle(e.target.value)}
                        />
                        <label className={styles.label}>
                                Descripción
                        </label>
                        <textarea 
                            className={`${styles.textarea} ${global.input_field}`}
                            type="text"
                            placeholder='Escribir aquí una Descripción'
                            maxLength={450}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.imageInputs}>
                        <label className={styles.label}>Imagen Principal</label>
                        <ImageInput 
                            className={'previewMain'}
                            file={mainImage}
                            setFile={setMainImage}
                            inputId="mainImage"
                        />
                        <div className={styles.subImages}>
                            <div>
                                <label className={styles.label}>Mapa Ruta</label>
                                <ImageInput 
                                    className={'previewSub'}
                                    file={mapImage}
                                    setFile={setMapImage}
                                    inputId="mapImage"
                                />
                            </div>
                            <div>
                                <label className={styles.label}>Imagen Descripción</label>
                                <ImageInput 
                                    className={'previewSub'}
                                    file={descriptionImage}
                                    setFile={setDescriptionImage}
                                    inputId="descriptionImage"
                                />
                            </div>
                        </div>
                        <label className={styles.label}>Imágenes Carrusel</label>
                        <div className={styles.subImages}>
                            <ImageInput 
                                className={'previewBottom'}
                                file={carouselImage1}
                                setFile={setCarouselImage1}
                                inputId="carouselImage1"
                            />
                            <ImageInput 
                                className={'previewBottom'}
                                file={carouselImage2}
                                setFile={setCarouselImage2}
                                inputId="carouselImage2"
                            />
                            <ImageInput 
                                className={'previewBottom'}
                                file={carouselImage3}
                                setFile={setCarouselImage3}
                                inputId="carouselImage3"
                            />
                            <ImageInput 
                                className={'previewBottom'}
                                file={carouselImage4}
                                setFile={setCarouselImage4}
                                inputId="carouselImage4"
                            />
                        </div>
                    </div>
                </div>
                <button className={`${styles.submitBtn} btn-primary`} type='submit'>Guardar Ruta</button>
            </form>
        </div>
            )
}