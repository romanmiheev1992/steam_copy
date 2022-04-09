import {HeaderProps} from './Header.props'
import styles from './Header.module.css'
import { MenuHeaderComponent, MenuToggle } from '../../components'
import Steam from './icon/steam.svg'


export const Header = ({...props}: HeaderProps): JSX.Element => {

    return (
        <div 
        {...props}
        className={styles.Header}
        >
            <MenuToggle type="open"/>
            <div className={styles.Steam}>
                <Steam/>
            </div>
            <h3>STEAM</h3>
            <MenuHeaderComponent/>
        </div>
    )
}

