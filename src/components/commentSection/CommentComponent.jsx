import styles from "./CommentComponent.module.css";

const StarIcon = () => (
  <svg
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.51713 2.77474C8.70246 2.20435 9.50941 2.20435 9.69474 2.77473L10.9129 6.52386C10.9958 6.77895 11.2335 6.95165 11.5017 6.95165H15.4438C16.0435 6.95165 16.2929 7.7191 15.8077 8.07162L12.6185 10.3887C12.4015 10.5464 12.3107 10.8258 12.3936 11.0809L13.6117 14.83C13.7971 15.4004 13.1442 15.8747 12.659 15.5222L9.46983 13.2051C9.25285 13.0475 8.95902 13.0475 8.74203 13.2051L5.55284 15.5222C5.06764 15.8747 4.4148 15.4004 4.60013 14.83L5.8183 11.0809C5.90118 10.8258 5.81038 10.5464 5.5934 10.3887L2.4042 8.07162C1.919 7.7191 2.16836 6.95165 2.7681 6.95165H6.71016C6.97837 6.95165 7.21608 6.77895 7.29897 6.52386L8.51713 2.77474Z"
      fill="#0DA665"
    />
  </svg>
);

const CommentComponent = ({ userName, comment, picture, rating }) => {
  return (
    <div className={styles.commentCard}>
      <div className={styles.userInfoContainer}>
        <div className={styles.avatar}>
            <img
              src={picture}
              className={styles.avatarImage}
            />
        </div>
        <div className={styles.textContent}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.commentText}>{comment}</div>
        </div>
      </div>
      <div className={styles.ratingContainer}>
        {[...Array(rating)].map((_, index) => (
          <div key={index} className={styles.starWrapper}>
            <StarIcon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;