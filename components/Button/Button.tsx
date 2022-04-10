import { ButtonProps } from "./Button.props";
import cn from 'classnames'
import Arrow from './icons/arrow.svg'
import styles from './Button.module.css'

export const Button = ({type, ...props}: ButtonProps): JSX.Element => {
    
    return (
        <button 
        {...props}
        className={cn(styles.Button, {
            [styles.SliderRightButton]: type === 'slider_right',
            [styles.SliderLeftButton]: type === 'slider_left',
        })}
        >

            <Arrow/>
        </button>
    )
}