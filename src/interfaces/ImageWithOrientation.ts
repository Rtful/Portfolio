import {Orientation} from "@mui/material";

export interface ImageWithOrientation {
    path: string;
    name: string;
    aspectRatio: number;
    orientation: Orientation;
}