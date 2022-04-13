import { DetailedHTMLProps, HTMLAttributes } from "react";
import { GamePhotos } from "../../../interfaces/dataInterfase";

export interface SliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    photos: GamePhotos,
    num: number
}