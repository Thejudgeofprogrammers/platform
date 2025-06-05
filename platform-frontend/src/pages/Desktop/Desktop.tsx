import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/desktop.module.css";
import YouTubeApp from "./icons/YouTubeApp";
import NoteApp from "./icons/NoteApp";
import { initialIcons } from "./iconList";

const GRID_SIZE = 80;

const Desktop: React.FC = () => {
    const [icons, setIcons] = useState(initialIcons);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [showNote, setShowNote] = useState(false);
    const [showYouTube, setShowYouTube] = useState(false);
    
    const desktopRef = useRef<HTMLDivElement>(null);

    const snapToGrid = (x: number, y: number) => {
        const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE - 38;
        return { x: snappedX, y: snappedY };
    };

    const handleIconDoubleClick = (id: string) => {
        if (id === "youtube") {
            setShowYouTube(true);
        }
        if (id === "note") {
            setShowNote(true);
        }
    };

    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        const icon = icons.find(i => i.id === id);
        if (!icon) return;

        setDraggingId(id);
        setOffset({ x: e.clientX - icon.x, y: e.clientY - icon.y });

        setIcons(prev =>
            prev.map(i => (i.id === id ? { ...i, transition: false } : i))
        );
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!draggingId) return;

            const desktopRect = desktopRef.current?.getBoundingClientRect();
            if (!desktopRect) return;

            const offsetX = e.clientX - desktopRect.left;
            const offsetY = e.clientY - desktopRect.top;

            const maxX = desktopRect.width - GRID_SIZE;
            const maxY = desktopRect.height - GRID_SIZE;

            const newX = Math.min(Math.max(0, offsetX - offset.x), maxX);
            const newY = Math.min(Math.max(40, offsetY - offset.y), maxY);

            setIcons(prev =>
                prev.map(icon =>
                    icon.id === draggingId ? { ...icon, x: newX, y: newY } : icon
                )
            );
        };

        const handleMouseUp = () => {
            if (draggingId) {
                setIcons(prev =>
                    prev.map(icon =>
                        icon.id === draggingId
                        ? {
                            ...icon,
                            ...snapToGrid(icon.x, icon.y),
                            transition: true,
                            }
                        : icon
                    )
                );
            }
            setDraggingId(null);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [draggingId, offset]);

    return (
        <div ref={desktopRef} className={styles.desktop}>
            <div className={styles.topbar}>
                <div className={styles.left}>
                    <button className={styles.button}>Пуск</button>
                    <button className={styles.button}>Поиск</button>
                </div>
                <div className={styles.clock}>12:34</div>
            </div>

            {icons.map(icon => (
                <div
                    key={icon.id}
                    className={`${styles.icon} ${icon.transition === false ? styles["no-transition"] : ""}`}
                    onMouseDown={e => handleMouseDown(e, icon.id)}
                    onDoubleClick={() => handleIconDoubleClick(icon.id)}
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
            ))}

            {showYouTube && <YouTubeApp onClose={() => setShowYouTube(false)} />}
            {showNote && <NoteApp onClose={() => setShowNote(false)} />}
        </div>
    );
};

export default Desktop;
