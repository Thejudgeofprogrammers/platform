// hooks/useDraggableResizable.ts
import { useState, useRef, useEffect } from "react";

export function useDraggableResizable(defaultWidth: number, defaultHeight: number) {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const positionRef = useRef(position);
    const offset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

    const handleMouseDown = (e: React.MouseEvent, element: HTMLElement | null) => {
        if (!element) return;
        setIsDragging(true);
        const rect = element.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleMouseMove = (e: MouseEvent, parentElement: HTMLElement | null) => {
        if (!isDragging || !parentElement) return;
        const parentRect = parentElement.getBoundingClientRect();

        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;

        const maxX = parentRect.width - size.width;
        const maxY = parentRect.height - size.height;

        setPosition({
            x: Math.min(Math.max(newX, 0), maxX),
            y: Math.min(Math.max(newY, 40), maxY),
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleResizeStart = (e: React.MouseEvent, direction: string) => {
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

    const handleResize = (e: MouseEvent) => {
        if (!isResizing || !resizeDirection) return;

        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;

        if (resizeDirection.includes("right")) newWidth = Math.max(400, newWidth + dx);
        if (resizeDirection.includes("bottom")) newHeight = Math.max(300, newHeight + dy);

        setSize({ width: newWidth, height: newHeight });
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
        setResizeDirection(null);
    };

    const handleMaximizeRestore = () => {
        if (!isMaximized) {
            setSize({ width: window.innerWidth - 2, height: window.innerHeight - 40 });
            setPosition({ x: 0, y: 40 });
        } else {
            setSize({ width: defaultWidth, height: defaultHeight });
            setPosition({ x: 100, y: 100 });
        }
        setIsMaximized(!isMaximized);
    };

    useEffect(() => {
        const move = (e: MouseEvent) => handleMouseMove(e, document.body);
        if (isDragging) {
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleResize);
            document.addEventListener("mouseup", handleResizeEnd);
        }
        return () => {
            document.removeEventListener("mousemove", handleResize);
            document.removeEventListener("mouseup", handleResizeEnd);
        };
    }, [isResizing]);

    return {
        position,
        size,
        isMaximized,
        setIsMaximized,
        setPosition,
        setSize,
        handleMouseDown,
        handleResizeStart,
        handleMaximizeRestore,
    };
}
