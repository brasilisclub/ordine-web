import React from "react";
import styles from "./card.module.css";

interface CardInterface {
  label: string,
  content: string
}

function Card({ label, content }: CardInterface) {
  return(
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

export default Card;
