import React, { useEffect, useState } from "react";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import appFirebase from "../../../../credenciales";
import styles from "./forumCommentBox.module.css";
import CommentCard from "./forumCommentCard";
import default_picture from "../../../assets/no-profile-picture.png";

export function ForumCommentBox() {
  const [comments, setComments] = useState([]);
  const db = getFirestore(appFirebase);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(db, "comments");
        const queryCollection = query(
          commentsCollection,
          where("destino", "==", "Foro")
        );
        const commentsSnapshot = await getDocs(queryCollection);
        const commentList = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentList);
      } catch (error) {
        console.log("Error: ", {error});
      }
    };

    fetchComments()
  }, [db]);

  const verifyProfile = (commentPicture) => {
    if (commentPicture === null) {
      return default_picture;
    } else {
      return commentPicture;
    }
  };

  return (
    <div className={styles.inputContainer}>
      <section className={styles.forumContent}>
        <article className={styles.content}>
          {comments.map((comment) => (
            <CommentCard 
            picture={verifyProfile(comment.picture)}
            userName={comment.autor}
            comment={comment.comment}
            />
          ))}
        </article>
      </section>
    </div>
  );
}