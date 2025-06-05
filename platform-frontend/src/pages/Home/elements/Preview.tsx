import React from "react";
import styles from "../styles/preview.module.css";

const Preview: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Мини-рабочий стол</h2>
      <p className={styles.text}>
        Интерфейс, который ты кастомизируешь сам. Добавляй виджеты, сервисы, документы и делай его своим.
      </p>
      <div className={styles.imageWrapper}>
        <img src="ui-photo.jpg" alt="Preview" className={styles.image} />
      </div>
    </section>
  );
};

export default Preview;
