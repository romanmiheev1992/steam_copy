import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type: 'slider_right'| 'slider_left' | 'submit' 
}