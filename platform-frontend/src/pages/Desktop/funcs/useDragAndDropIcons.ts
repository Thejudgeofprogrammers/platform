import { useEffect } from "react";

export function useDragAndDrop({
    draggingId,
    setDraggingId,
    setIcons,
    offset,
    desktopRef,
    GRID_SIZE,
    snapToGrid,
}: any) {
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

            setIcons((prev: any) =>
                prev.map((icon: any) =>
                    icon.id === draggingId ? { ...icon, x: newX, y: newY } : icon
                )
            );
        };

        const handleMouseUp = () => {
            if (draggingId) {
                setIcons((prev: any) =>
                    prev.map((icon: any) =>
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
    }, [GRID_SIZE, desktopRef, draggingId, offset, setDraggingId, setIcons, snapToGrid]);
}
