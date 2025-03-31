import React from "react";
import styles from "./forumCommentCard.module.css";

const CommentCard = ({ picture, userName, comment }) => {
  return (
    <div className={styles.commentCard}>
      <div className={styles.userInfoContainer}>
        <img className={styles.avatarImage} src={picture}/>
        <div className={styles.textContent}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.commentText}>{comment}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;