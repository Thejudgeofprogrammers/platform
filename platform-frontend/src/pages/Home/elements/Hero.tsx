import React from "react";
import styles from "../styles/hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heroTitle}>Твой виртуальный рабочий стол</h1>
      <p className={styles.heroDescription}>
        Место, где ты создаёшь, общаешься и управляешь всем — от документов до музыки.
      </p>
      <button className={styles.ctaButton}>Попробовать сейчас</button>
    </section>
  );
};

export default Hero;