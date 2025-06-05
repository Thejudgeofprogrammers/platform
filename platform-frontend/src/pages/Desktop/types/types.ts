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
