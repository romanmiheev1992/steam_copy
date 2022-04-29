import { SortSectionProps } from "./SortSection.props"
import styles from './SortSection.module.css'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { SortListAction } from "../../redux/types/sortReducerType"
import { GameActions } from "../../redux/types/gamesType"
import { Button } from "../Button/Button"

export const SortSection = ({activeGenre, ...props}: SortSectionProps): JSX.Element => {
    
    const onChangeGenre = (e) => {
        activeGenre(e.target.value)
    }

    return(
        <div className={styles.SortSection} {...props}>
            <span>Сортировка по жанру</span>
            <div>
               <select onChange={(e) => onChangeGenre(e)}>
                <option value={'Экшен'}>Экшен</option>
                <option value={'Приключения'}>Приключения</option>
                <option value={'Ролевые'}>Ролевые</option>
                <option value={'Симулятор'}>Симулятор</option>
                <option value={'Стратегия'}>Стратегия</option>
            </select> 
            </div>
        </div>
    )
}