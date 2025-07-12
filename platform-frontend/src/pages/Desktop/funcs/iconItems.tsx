import React from "react";
import styles from "../styles/desktop.module.css";
import { IconItemProps } from "../types/types";

const IconItem: React.FC<IconItemProps> = ({ icon, draggingId, onMouseDown, onDoubleClick }) => {
    return (
        <div
            className={`${styles.icon} ${icon.transition === false ? styles["no-transition"] : ""}`}
            onMouseDown={e => onMouseDown(e, icon.id)}
            onDoubleClick={() => onDoubleClick(icon.id)}
            style={{
                position: "absolute",
                left: icon.x,
                top: icon.y,
                zIndex: draggingId === icon.id ? 1000 : 1,
            }}
        >
            <img src={icon.img} alt={icon.label} />
            <span>{icon.label}</span>
        </div>
    );
};

export default IconItem;
