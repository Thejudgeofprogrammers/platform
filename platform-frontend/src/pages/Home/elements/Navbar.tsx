import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        DeskVerse
      </Link>

      {/* Бургер-иконка */}
      <div
        className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Меню */}
      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <Link
          to="/login"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Войти
        </Link>
        <Link
          to="/register"
          className={styles.button}
          onClick={() => setMenuOpen(false)}
        >
          Регистрация
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
