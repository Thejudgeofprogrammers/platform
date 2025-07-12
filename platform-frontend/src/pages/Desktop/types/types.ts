export type IconData = {
    id: string;
    label: string;
    img: string;
    x: number;
    y: number;
    transition?: boolean;
};

export interface IconProps {
    icon: IconData;
    onMouseDown: (e: React.MouseEvent, id: string) => void;
    isDragging: boolean;
}

export interface YouTubeAppProps {
    onClose: () => void;
}

export interface IconItemProps {
    icon: any;
    draggingId: string | null;
    onMouseDown: (e: React.MouseEvent, id: string) => void;
    onDoubleClick: (id: string) => void;
}
