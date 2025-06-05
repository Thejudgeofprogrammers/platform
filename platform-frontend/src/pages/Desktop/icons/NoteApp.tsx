import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Window.module.css"; // Используй те же стили, что и для YouTube

const NoteApp = ({ onClose }: { onClose: () => void }) => {
    const [text, setText] = useState("");
    const [position, setPosition] = useState({ x: 200, y: 200 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isMinimized, setIsMinimized] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("note");
        if (saved) setText(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("note", text);
    }, [text]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!windowRef.current) return;
        const rect = windowRef.current.getBoundingClientRect();
        setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    });

    return (
        <div
            ref={windowRef}
            className={styles.window}
            style={{
                top: position.y,
                left: position.x,
                position: "absolute",
                width: isMinimized ? "200px" : "400px",
                height: isMinimized ? "40px" : "300px",
                zIndex: 1000,
            }}
        >
            <div className={styles.header} onMouseDown={handleMouseDown}>
                <span>Note</span>
                <div className={styles.header_button}>
                    <button onClick={() => setIsMinimized(true)}>_</button>
                    <button onClick={() => setIsMinimized(false)}>▢</button>
                    <button onClick={onClose}>✕</button>
                </div>
            </div>

            {!isMinimized && (
                <textarea
                    className={styles.content}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: "100%", height: "100%", resize: "none" }}
                />
            )}
        </div>
    );
};

export default NoteApp;
