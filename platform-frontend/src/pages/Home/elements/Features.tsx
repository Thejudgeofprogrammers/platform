import React from "react";
import styles from "../styles/features.module.css";
import { LaptopIcon, UsersIcon, MusicIcon, FileTextIcon } from "lucide-react";

const features = [
  {
    title: "Совместные документы",
    description: "Word, Excel и Markdown прямо в браузере.",
    icon: <FileTextIcon size={24} />,
  },
  {
    title: "Соцсеть и друзья",
    description: "Добавляй друзей, общайся и создавай рабочие команды.",
    icon: <UsersIcon size={24} />,
  },
  {
    title: "Мультимедиа",
    description: "Смотри YouTube, слушай музыку — вместе или один.",
    icon: <MusicIcon size={24} />,
  },
  {
    title: "Визуальный контроль",
    description: "На твоём виртуальном столе только то, что тебе нужно.",
    icon: <LaptopIcon size={24} />,
  },
];

const Features: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Что ты можешь здесь делать?</h2>
      <div className={styles.grid}>
        {features.map((feat, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.icon}>{feat.icon}</div>
            <h3 className={styles.cardTitle}>{feat.title}</h3>
            <p className={styles.description}>{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
