import cn from 'classnames'
import styles from './Sidebar.module.css'
import { useDispatch } from 'react-redux'
import { SidebarProps } from './Sidebar.props'
import { MenuToggle } from '../../components'
import { MenuAction } from '../../redux/types/menuType'
import { useSelectorHook } from '../../hooks/useSelectorHook'
import { MenuComponent } from '../../components'


export const Sidebar = ({...props}: SidebarProps): JSX.Element => {
    const {menuToggle, menuList} = useSelectorHook(state => state)
    const dispatch = useDispatch()

    const blackBlock = () => <div onClick={() => dispatch({type: MenuAction.HIDE_MENU})} className={styles.BlackBlock}></div>

    const onClick = (e) => {
        dispatch({type: MenuAction.LIST_TOGGLE, payload: e.target.outerText})
    }
       
    return (
        <>
            <div 
                {...props}
                className={cn(styles.Sidebar, {
                    [styles.Sidebar_Show]: menuToggle.toggleMenu === true,
                    [styles.Sidebar_Hide]: menuToggle.toggleMenu === false,
                })}
            >
                <MenuToggle type='close'/>
                <ul className={styles.MainList}>
                    {
                        menuList.menuList && menuList.menuList.map(menuItem => (
                            <>
                                <li 
                                key={menuItem.name}
                                onClick={(e) => onClick(e)} 
                                >{menuItem.name.toUpperCase()}</li>
                                {
                                    <MenuComponent toggle={menuToggle} list={menuItem}/>
                                }
                            </>
                            
                        ))
                    }   
                </ul>
            </div>
            {
                menuToggle.toggleMenu
                ? blackBlock()
                : null
            }
           
        </>
       
    )
}