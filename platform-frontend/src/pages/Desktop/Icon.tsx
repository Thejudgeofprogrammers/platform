import React from "react";
import styles from "./styles/desktop.module.css";
import { IconProps } from "./types/types";

const Icon: React.FC<IconProps> = ({ icon, onMouseDown, isDragging }) => {
    return (
        <div
            className={styles.icon}
            onMouseDown={e => onMouseDown(e, icon.id)}
            style={{
                position: "absolute",
                left: icon.x,
                top: icon.y,
                zIndex: isDragging ? 1000 : 1,
            }}
        >
            <img src={icon.img} alt={icon.label} />
            <span>{icon.label}</span>
        </div>
    );
};

export default Icon;
