import React from "react";
import styles from "../styles/footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 DeskVerse. Все права защищены.</p>
      <div className={styles.links}>
        <a href="#">GitHub</a>
        <a href="#">Контакты</a>
        <a href="#">Политика</a>
      </div>
    </footer>
  );
};

export default Footer;
