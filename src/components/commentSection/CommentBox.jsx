import styles from "./CommentBox.module.css";
import React, { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import appFirebase from "../../../credenciales";
import default_picture from "../../assets/no-profile-picture.png";


function CommentBox({ destino }) {
  const [comments, setComments] = useState([]);
  const db = getFirestore(appFirebase);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(db, "comments");
        const queryCollection = query(
          commentsCollection,
          where("destino", "==", destino)
        );
        const commentsSnapshot = await getDocs(queryCollection);
        const commentList = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentList);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchComments();
  }, [db, destino]);

    const verifyProfile = (commentPicture) => {
      if (commentPicture === null ) {
        return default_picture;
      } else {
        return commentPicture;
      }
    };

  return (
    <section className={styles.container}>
      <article className={styles.content}>
        {comments.map((comment) => (
          <CommentComponent
            userName={comment.autor}
            comment={comment.comment}
            picture={verifyProfile(comment.picture)}
            rating={comment.stars}
          />
        ))}
      </article>
    </section>
  );
}

export default CommentBox;