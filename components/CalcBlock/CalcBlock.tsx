import { CalcBlockProps } from "./CalcBlock.props"
import styles from './CalcBlock.module.css'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { useState } from "react"
export const CalcBlock = ({...props}: CalcBlockProps): JSX.Element => {


    const {gameBasket} = useSelectorHook(state => state)
    const [sum, setSumm] = useState<number>(0)

    return (
        <div className={styles.CalcBlock} {...props}>
            {
                gameBasket.games && gameBasket.games.map(game => (
                    <p key={game.alias}>{game.name}</p>
                ))
            }
            <p>И того: {gameBasket.games.reduce((acum, item) => acum += item.sales.status ? item.price - Math.round((item.price / 100) * item.sales.value) : item.price , 0)} руб.</p>
        </div>
    )
}