import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/retro-auth.module.css";

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles["window-bar"]}>🔐 Login</div>
      <h2 className={styles.title}>Добро пожаловать</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Пароль" className={styles.input} />
        <button type="submit" className={styles.button}>Войти</button>
      </form>

      <div className={styles.links}>
        <Link to="/register" className={styles.link}>Создать аккаунт</Link><br />
        <Link to="/" className={styles.link}>На главную</Link>
      </div>
    </div>
  );
};

export default Login;
