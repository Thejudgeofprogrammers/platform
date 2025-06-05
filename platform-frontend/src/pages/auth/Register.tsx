import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/retro-auth.module.css";

const Register: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles["window-bar"]}>📝 Регистрация</div>
      <h2 className={styles.title}>Создай аккаунт</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Имя пользователя" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Пароль" className={styles.input} />
        <button type="submit" className={styles.button}>Зарегистрироваться</button>
      </form>

      <div className={styles.links}>
        <Link to="/login" className={styles.link}>Уже есть аккаунт?</Link><br />
        <Link to="/" className={styles.link}>На главную</Link>
      </div>
    </div>
  );
};

export default Register;
