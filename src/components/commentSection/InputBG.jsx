import * as React from "react";
import styles from "./InputBG.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import appFirebase from '../../../credenciales';
import { doc, getFirestore, setDoc} from "firebase/firestore";
import {v4 as uuidv4} from "uuid";


function StarRating({ rating, onRatingChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.starRating}>
      {stars.map((star) => (
        <button
          key={star}
          className={`${styles.starButton} ${
            star <= rating ? styles.starActive : ""
          }`}
          onClick={() => onRatingChange(star)}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewInput({ value, placeholder, onChange }) {
  return (
    <textarea
      className={styles.escribirunaresea}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

function ActionButtons({ onSend, onCancel }) {
  return (
    <div className={styles.actionButtons}>
      <button
        onClick={onCancel}
        className={`${styles.button} ${styles.cancelButton}`}
      >
        Cancelar
      </button>
      <button
        onClick={onSend}
        className={`${styles.button} ${styles.sendButton}`}
      >
        Comentar
      </button>
    </div>
  );
}

function InputBG(destino) {
  const { logged, profile } = React.useContext(UserContext);
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const db = getFirestore(appFirebase);
  const navigate = useNavigate();

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSend = async () => {
    if(logged === true){
      if (rating === 0) {
        alert("Porfavor, selecione un rating");
        return;
      }
  
      try{
        const commentId = uuidv4();
        await setDoc(doc(db, "comments", commentId), {
          autor: profile.name,
          autor_id: profile.uid,
          comment : review,
          picture : profile.profilePicture || null,
          stars: rating,
          destino: destino.destino,
          CreationDate: new Date(),
        });
        console.log("Mandando comentario:", { rating, review });
        handleCancel();
  
        const scrollPosition = window.scrollY;
        window.location.reload();
        window.scrollTo(0, scrollPosition);
        window.scrollTo(0, document.body.scrollHeight);
      } catch(error){
        console.error("Error al almacenar el comentario:", error);
      }
    } else{
      navigate("./Login");
      handleCancel();
    }
  };

  const handleCancel = () => {
    setRating(0);
    setReview("");
  };

  return (
    <section className={styles.inputBg}>
      <div className={styles.reviewContainer}>
        <StarRating rating={rating} onRatingChange={setRating} />
        <div className={styles.inputWrapper}>
          <ReviewInput
            value={review}
            placeholder="Escribir una reseña..."
            onChange={handleReviewChange}
          />
        </div>
        <ActionButtons onSend={handleSend} onCancel={handleCancel} />
      </div>
    </section>
  );
}

export default InputBG;