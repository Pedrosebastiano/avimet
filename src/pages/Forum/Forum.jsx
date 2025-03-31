import * as React from "react";
import styles from "./Forum.module.css";
import { ForumCommentBox } from "../../components/commentSection/ForumComments/forumCommentBox";
import { ForumCommentBar } from "../../components/commentSection/ForumComments/forumCommentBar";

function Forum() {
  return (
    <main className={styles.mainContainer}>
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Roboto:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          <span>Interactúa con otros</span>
          <span className={styles.highlightedText}> excursionistas</span>
        </h1>
        <hr className={styles.divider} />
      </div>
        <ForumCommentBox />
        <ForumCommentBar />
    </main>
  );
}

export default Forum;
