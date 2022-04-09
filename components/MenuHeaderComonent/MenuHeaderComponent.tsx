import { useState } from 'react';
import { useSelectorHook } from '../../hooks/useSelectorHook';
import { Search } from '../Serch/Serch';
import styles from './MenuHeaderComponent.module.css'
import { MenuHeaderComponentProps } from "./MenuHeaderComponent.props";

export const MenuHeaderComponent = ({...props}: MenuHeaderComponentProps) => {
    const [value, useValue] = useState<string>('')
    const {menuList} = useSelectorHook(state => state)
    const menuItemsComponets = (props) => {

        return (
            <ul className={styles.MenuItemsComponets}>
                {
                    props.block.map(item => (
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        )
    }

    
    const onMouseEnter = (e, menuItem) => {
        useValue(e.target.outerText)
    }

    const onMouseleave = () => {
        useValue('')
    }

    return (
        <div 
        className={styles.MenuHeaderComponent}
        {...props}
        >
            <ul>
                {
                    menuList.menuList.map(menuItem => (
                        <>
                            <li
                              onMouseEnter={(e) => onMouseEnter(e, menuItem)} 
                              onMouseLeave={onMouseleave} 
                            >{menuItem.name}
                               {
                                  value === menuItem.name
                                  ? menuItemsComponets(menuItem)
                                  : null
                              }
                            </li>
                          
                        </>
                      
                    ))
                  
                }  
                
            </ul>
            <Search/>
        </div>
    )
}