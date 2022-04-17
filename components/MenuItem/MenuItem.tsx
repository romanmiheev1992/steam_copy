import { MenuItemProps } from "./MenuItem.props"
import styles from './MenuItem.module.css'
import { useRef, useState } from "react"
import Arrow from './icon/arrow2.svg'
import cn from 'classnames'
import Link from "next/link"
import { listenerCount } from "process"
import { useDispatch } from "react-redux"
import { MenuAction } from "../../redux/types/menuType"

export const MenuItem = ({list, ...props}: MenuItemProps): JSX.Element => {

    const [active, setActive] = useState<boolean>(false)
    const dispatch = useDispatch()

    const onClick = () => {
        setActive(!active)
    }

    const link = () => {
        if(list.name.toUpperCase() === 'ЖАНРЫ') {
            return '/genre/'
        }
        if(list.name.toUpperCase() === 'НОВОЕ И ПРИМЕЧАТЕЛЬНОЕ') {
            return '/popular/'
        }
        if(list.name.toUpperCase() === 'РЕГИСТРАЦИЯ') {
            return ''
        }
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
                    <Link 
                    key={item.alias} 
                    href={`${link()}${item.alias}`}
                    
                    >
                        <li 
                            onClick={() => dispatch({type: MenuAction.HIDE_MENU})}
                            className={cn(styles.listItem, {
                                [styles.active]: active,
                                [styles.disactive]: !active
                            })}
                        >{item.name}
                        </li>
                    </Link>
                    
                ))
             
            }  
            </ul> 
        </>
       
    )
}