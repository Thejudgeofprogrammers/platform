import React, { useState, useRef } from "react";
import styles from "./styles/desktop.module.css";
import YouTubeApp from "./icons/YouTubeApp";
import NoteApp from "./icons/NoteApp";
import { initialIcons } from "./utils/iconList";
import { useDragAndDrop } from "./funcs/useDragAndDropIcons";
import IconItem from "./funcs/iconItems";
import { GRID_SIZE, snapToGrid } from "./utils/utils";

const Desktop: React.FC = () => {
    const [icons, setIcons] = useState(initialIcons);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [showNote, setShowNote] = useState(false);
    const [showYouTube, setShowYouTube] = useState(false);
    const desktopRef = useRef<HTMLDivElement>(null);

    useDragAndDrop({ draggingId, setDraggingId, icons, setIcons, offset, setOffset, desktopRef, GRID_SIZE, snapToGrid});

    const handleIconDoubleClick = (id: string) => {
        if (id === "youtube") setShowYouTube(true);
        if (id === "note") setShowNote(true);
    };

    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        const icon = icons.find(i => i.id === id);
        if (!icon) return;
        setDraggingId(id);
        setOffset({ x: e.clientX - icon.x, y: e.clientY - icon.y });
        setIcons(prev => prev.map(i => (i.id === id ? { ...i, transition: false } : i)));
    };

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
                <IconItem
                    key={icon.id}
                    icon={icon}
                    draggingId={draggingId}
                    onMouseDown={handleMouseDown}
                    onDoubleClick={handleIconDoubleClick}
                />
            ))}

            {showYouTube && <YouTubeApp onClose={() => setShowYouTube(false)} />}
            {showNote && <NoteApp onClose={() => setShowNote(false)} />}
        </div>
    );
};

export default Desktop;
