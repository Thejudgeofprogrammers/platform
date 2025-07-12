import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/youtubeApp.module.css";
import { YouTubeAppProps } from "../types/types";
import { extractVideoId } from "../utils/utils";

const YouTubeApp: React.FC<YouTubeAppProps> = ({ onClose }) => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [videoId, setVideoId] = useState<string | null>(null);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMaximized, setIsMaximized] = useState(false);
    const [size, setSize] = useState({ width: 800, height: 500 });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);


    const offset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);
    const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

    const handleResizeStart = (e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        e.preventDefault();
        resizeStart.current = {
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height,
        };
        setResizeDirection(direction);
        setIsResizing(true);
    };

    const positionRef = useRef(position);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    const handleResize = (e: MouseEvent) => {
        if (!isResizing || !resizeDirection) return;

        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = positionRef.current.x;
        let newY = positionRef.current.y;

        if (resizeDirection.includes("right")) {
            newWidth = Math.max(400, resizeStart.current.width + dx);
        }
        if (resizeDirection.includes("bottom")) {
            newHeight = Math.max(300, resizeStart.current.height + dy);
        }

        if (newX !== positionRef.current.x || newY !== positionRef.current.y) {
            setPosition({ x: newX, y: newY });
        }

        setSize({ width: newWidth, height: newHeight });
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
        setResizeDirection(null);
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleResize);
            document.addEventListener("mouseup", handleResizeEnd);
        } else {
            document.removeEventListener("mousemove", handleResize);
            document.removeEventListener("mouseup", handleResizeEnd);
        }

        return () => {
            document.removeEventListener("mousemove", handleResize);
            document.removeEventListener("mouseup", handleResizeEnd);
        };
    }, [isResizing]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
            offset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && windowRef.current && windowRef.current.parentElement) {
            const parentRect = windowRef.current.parentElement.getBoundingClientRect();
            const windowRect = windowRef.current.getBoundingClientRect();

            const newX = e.clientX - offset.current.x;
            const newY = e.clientY - offset.current.y;

            const minX = 0;
            const minY = 40;
            const maxX = parentRect.width - windowRect.width;
            const maxY = parentRect.height - windowRect.height;

            const clampedX = Math.min(Math.max(newX, minX), maxX);
            const clampedY = Math.min(Math.max(newY, minY), maxY);

            setPosition({ x: clampedX, y: clampedY });
        }
    };

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const handleLoad = () => {
        const id = extractVideoId(url.trim());
        if (id) {
            setVideoId(id);
            setError("");
        } else {
            setVideoId(null);
            setError("Неверная ссылка на видео.");
        }
    };

    const handleMinimize = () => {
        setIsVisible(false);
    };

    const handleMaximizeRestore = () => {
        if (!isMaximized) {
            setSize({ width: window.innerWidth - 2, height: window.innerHeight - 40 });
            setPosition({ x: 0, y: 40 });
        } else {
            setSize({ width: 640, height: 360 });
            setPosition({ x: 100, y: 100 });
        }
        setIsMaximized(!isMaximized);
    };

    if (!isVisible) {
        return (
            <button
                className={styles.restoreButton}
                onClick={() => setIsVisible(true)}
            >
                Открыть окно
            </button>
        );
    }
  
  return (
    <div
      className={styles.window}
      ref={windowRef}
      style={{
        top: position.y,
        left: position.x,
        position: "absolute",
        width: size.width,
        height: size.height,
      }}
    >
      <div className={styles.header} onMouseDown={handleMouseDown}>
        <span>YouTube</span>
        <div className={styles.header_button}>
          <button onClick={handleMinimize}>_</button>
          <button onClick={handleMaximizeRestore}>▢</button>
          <button onClick={onClose}>✕</button>
        </div>
      </div>
      <div className={styles.content}>
        {!videoId && (
          <div className={styles.inputArea}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Вставьте ссылку на видео YouTube"
            />
            <button onClick={handleLoad}>Открыть</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        )}

        {videoId && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
    </div>
      <div
        className={`${styles.resizeHandle} ${styles.bottom}`}
        onMouseDown={(e) => handleResizeStart(e, "bottom")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.right}`}
        onMouseDown={(e) => handleResizeStart(e, "right")}
      />
    </div>
  );
};

export default YouTubeApp;
