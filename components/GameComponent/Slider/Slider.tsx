import { SliderProps } from "./Slider.props";
import styles from './Slider.module.css'

export const Slider = ({photos, num, ...props}: SliderProps): JSX.Element => {

    return (
        <div 
        {...props}
        className={styles.Slider}
        >
            {
                photos.cardImageListBig.map((photo, i) => (
                    num === i
                    ? <img src={photo}/>
                    : null
                ))
            }
            
        </div>
    )
}