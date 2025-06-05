import React from "react";
import styles from "../styles/cta.module.css";

const CTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Готов начать?</h2>
      <p className={styles.text}>Создай свой первый виртуальный рабочий стол прямо сейчас.</p>
      <button className={styles.button}>Присоединиться</button>
    </section>
  );
};

export default CTA;
