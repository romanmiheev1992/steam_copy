import { MenuItemProps } from "./MenuItem.props"
import styles from './MenuItem.module.css'
import { useState } from "react"
import Arrow from './icon/arrow2.svg'
import cn from 'classnames'

export const MenuItem = ({list, ...props}: MenuItemProps): JSX.Element => {

    const [active, setActive] = useState<boolean>(false)

    const onClick = () => {
        setActive(!active)
    }

    return (
        <>
            <li 
            onClick={() => onClick()} 
            className={cn(styles.HeadComponent, {
                [styles.active]: active,
                [styles.disactive]: !active
            })}
           
            > <span>{list.name.toUpperCase()}</span>
            <Arrow className={cn(styles.Arrow, {
                [styles.up]: active,
                [styles.down]: !active,
            })} />
            
            </li>

            <ul className={cn(styles.MenuComponent, {
                [styles.open]: active,
                [styles.close]: !active
            })}>
            {   
                list.block.map((item, i) => (
                    <li 
                        key={item.name}
                        className={cn(styles.listItem, {
                            [styles.active]: active,
                            [styles.disactive]: !active
                        })}
                    >{item.name}</li>
                ))
             
            }  
            </ul> 
        </>
       
    )
}