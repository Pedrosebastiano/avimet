import React from "react";
import styles from "./forumCommentBar.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import appFirebase from "../../../../credenciales";
import { doc, getFirestore, setDoc} from "firebase/firestore";
import {v4 as uuidv4} from "uuid";

const PAPER_PLANE_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="paper-plane-icon">
  <path d="M18.8443 10.517C20.0523 11.117 20.0523 12.884 18.8443 13.483L6.55232 19.584C5.32432 20.194 4.09432 19.091 4.26732 17.864L4.80732 14.034C4.84929 13.7267 4.97754 13.4376 5.1772 13.2002C5.37686 12.9629 5.63974 12.787 5.93532 12.693C6.09532 12.643 6.48532 12.56 6.94732 12.466C7.7429 12.3052 8.53959 12.1498 9.33732 12L8.70932 11.88C8.1214 11.7677 7.53406 11.6523 6.94732 11.534C6.60762 11.4693 6.27011 11.3936 5.93532 11.307C5.6396 11.2129 5.37663 11.0369 5.17696 10.7994C4.97729 10.5618 4.84911 10.2725 4.80732 9.965L4.26732 6.135C4.09432 4.909 5.32432 3.806 6.55232 4.415L18.8443 10.517ZM18.2503 12C18.2503 11.92 18.2143 11.878 18.1773 11.86L5.88632 5.76C5.86432 5.749 5.85332 5.75 5.84832 5.75C5.8333 5.75342 5.81926 5.76026 5.80732 5.77C5.77232 5.797 5.74132 5.848 5.75232 5.926L6.29232 9.756C6.30232 9.831 6.34932 9.866 6.37532 9.873C6.44832 9.896 6.74832 9.963 7.24632 10.063C7.72332 10.161 8.33632 10.281 8.99232 10.407C10.3053 10.659 11.7883 10.937 12.6963 11.105L12.7143 11.108C12.8193 11.128 12.9303 11.148 13.0173 11.17C13.0633 11.181 13.1363 11.201 13.2113 11.235C13.3657 11.2991 13.4962 11.41 13.5843 11.552C13.6678 11.6865 13.712 11.8417 13.712 12C13.712 12.1583 13.6678 12.3135 13.5843 12.448C13.4962 12.59 13.3657 12.7009 13.2113 12.765C13.149 12.7932 13.084 12.815 13.0173 12.83C12.917 12.8538 12.8159 12.8745 12.7143 12.892L12.6963 12.895C11.7883 13.064 10.3063 13.341 8.99232 13.593C8.33532 13.719 7.72232 13.839 7.24632 13.936C6.74832 14.037 6.44832 14.104 6.37532 14.126C6.34932 14.135 6.30332 14.169 6.29232 14.244L5.75232 18.074C5.74232 18.152 5.77232 18.203 5.80732 18.23C5.81926 18.2397 5.8333 18.2466 5.84832 18.25C5.85332 18.25 5.86432 18.251 5.88632 18.24L18.1773 12.14C18.2143 12.122 18.2503 12.08 18.2503 12Z" fill="#A3E96C"></path>
</svg>`;

export function ForumCommentBar() {
  const { logged, profile } = React.useContext(UserContext);
  const [review, setReview] = React.useState("");
  const db = getFirestore(appFirebase);
  const navigate = useNavigate();

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSend = async () => {
    if(logged ===true){
      if(review === ""){
        alert("Porfavor agregue una opinion para poder enviar");
        return;
      }

      try{
        const commentId = uuidv4();
        await setDoc(doc(db, "comments", commentId), {
          autor: profile.name,
          autor_id: profile.uid,
          picture: profile.profilePicture || null,
          comment: review,
          destino: "Foro",
          CreationDate: new Date(),
        });
        console.log("Mandando comentario:", {review}, "de foro");
        setReview("");
        window.location.reload();
      } catch(error){
        console.log("Error", {error}, " al querer enviar el mensaje");
      }
    } else{
      navigate("./Login");
      setReview("");
    }
  }
  

  return (
    <section className={styles.inputContainer}>
      <textarea
        className={styles.inputField}
        placeholder="Cuéntanos tu experiencia..."
        value={review}
        onChange={handleReviewChange}
      />
      <div className={styles.actionArea} />

      <button
      className={styles.iconButton}
      onClick={handleSend}
      type="button"
      dangerouslySetInnerHTML={{ __html: PAPER_PLANE_SVG }}
    />
    </section>
  );
}