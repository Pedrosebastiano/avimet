import React, { useContext } from "react";
import "./BannerTitle.css";
import { UserContext } from "../../context/UserContext";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { addDoc, collection, query, where, getDocs, getDoc, getFirestore, setDoc, doc } from "firebase/firestore";
import appFirebase from "../../../credenciales";

const db = getFirestore(appFirebase);


export default function BannerTitle({ titulo, subtitulo, botonTexto, onButtonClick , slug}) {
    const [primeraParte, ...resto] = titulo.split(" ");
    const {logged, profile} = useContext(UserContext)
    const [likes, setLikes] = React.useState([])
    var likedClass = 'not-liked'

    async function getLikes() {
            
        const likesDocRef = collection(db, "likes");
        
        const docSnap = await getDocs(likesDocRef);
        
        const likesList = docSnap.docs.map((doc) => ({
            ...doc.data(), 
        }));

        setLikes(likesList);

    }

    function isLiked(like) {
        if (like.uid == profile.uid && like.dslug == slug) {
            return like
        }
    }

    async function handleLike() {
        const liked = likes.filter(isLiked)
        const uid = profile.uid
        const dslug = slug;
        if (liked.length > 0) {
            const docRef = await getDocs(query(collection(db, "likes"), where("dslug", "==", dslug), where("uid", "==", uid)));
            const _doc = await getDoc(doc(db, "likes", docRef.docs[0].id));
            if (!_doc.data().active) {
                likedClass = 'not-liked'
            } else {
                likedClass = 'liked'
            }
            setDoc(doc(db, "likes", docRef.docs[0].id), { uid: uid , dslug: dslug , active: !_doc.data().active})
        } else {
            likedClass = 'liked'
            addDoc(collection(db, 'likes'), { uid: uid , dslug: dslug , active: true})
        }
        alert("Destino agregado a favorito con exito!!")

    }

    React.useEffect(() => {
        getLikes()
    }, [likes])

    return (
        <div className="contenido">
            <p className="subtitulo">{subtitulo}</p>
            <h1 className="titulo">
                <span className="primeraParte">{primeraParte}</span> {resto.join(" ")}
            </h1>
            <div className='btn-container'>
            {botonTexto && (
                <button className="btn-primary" onClick={onButtonClick}>
                    {botonTexto}
                </button>
            )}{logged ?(
                <button className='likebtn' onClick={handleLike} >
                    <LikeIcon className={likedClass}/>
                </button>
                ): (<></>)}
                

             
            </div>

        </div>
    );
}