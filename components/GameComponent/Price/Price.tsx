import { PriceProps } from "./Price.props"
import styles from './Price.module.css'
import { Button } from "../../Button/Button"

export const Price = ({game, className ,...props}: PriceProps): JSX.Element => {

    return (
        <div className={styles.PriceSection}>
            <div>Купить {game.name}</div>
            <div className={styles.PriceSectionBlock}>
                {
                    game.sales.status
                    ? <div className={styles.GameItemPriceSale}>
                        <span>{game.sales.value}%</span>
                        <span>{game.price}руб.</span>
                        <span>{game.price -  Math.round((game.price / 100) * game.sales.value)} руб.</span>
                      </div> 
                    : <div>{game.price} руб.</div>
                }  
                <Button type="primary">В корзину</Button> 
            </div>
        </div>
    )
}