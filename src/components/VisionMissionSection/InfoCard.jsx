import React from "react";
import styles from "./VisionMissionSection.module.css";
import IconSvg from "./IconSvg";

const InfoCard = ({ title, icon, content }) => {
  const cardClassName =
    title.toLowerCase() === "visión" ? styles.visionCard : styles.missionCard;

  return (
    <article className={cardClassName}>
      <h2 className={styles.title}>
        <span>{title}</span>
        <IconSvg content={icon} />
      </h2>
      <p className={styles.content}>{content}</p>
    </article>
  );
};

export default InfoCard;