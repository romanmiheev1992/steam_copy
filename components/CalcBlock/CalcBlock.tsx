import { CalcBlockProps } from "./CalcBlock.props"
import styles from './CalcBlock.module.css'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { useState } from "react"
import { Button } from "../Button/Button"
import { BankCard } from "../BankCard/BankCard"
import { useDispatch } from "react-redux"
import { CardToggleAction } from "../../redux/types/cardToggleType"
import { motion } from 'framer-motion'
export const CalcBlock = ({...props}: CalcBlockProps): JSX.Element => {

    const {gameBasket, cardToggle, cardNum} = useSelectorHook(state => state)
    const dispatch = useDispatch()
    const onClick = () => {
        if(cardNum.cardSuccess) {
         
        } else {
            dispatch({type: CardToggleAction.TOGGLE_CARD})
        }
    }

    return (

        <>
        <motion.div layout className={styles.CalcBlock}>

            {
                gameBasket.games && gameBasket.games.map(game => (
                    <p key={game.alias}>{game.name}</p>
                ))
            }
            <p>И того: {gameBasket.games.reduce((acum, item) => acum += item.sales.status ? item.price - Math.round((item.price / 100) * item.sales.value) : item.price , 0)} руб.</p>
            {
                gameBasket.games.length
                ? <Button onClick={onClick} type="submit">Купить</Button>
                : null
            }
            
        </motion.div>

        </>
        
    )
}