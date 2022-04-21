import { LastWatchedComponentProps} from "./LastWatchedComponent.props"
import styles from './LastWatchedComponent.module.css'
import { useSelectorHook } from "../../../hooks/useSelectorHook"
import Link from "next/link"
import { Button } from "../../Button/Button"


export const LastWatchedComponent = ({game, ...props}: LastWatchedComponentProps): JSX.Element => {

    const {watchedList} = useSelectorHook(state => state.watchedList)

    return (
        <div className={styles.LastWatchedComponent} {...props}>
            <p>Последнее просмотренное вами</p>
            <div className={styles.LastWatchedComponentBlock}>
                <Link key={game.alias} href={`/games/${game.alias}`}>
                    <div className={styles.GameSection}>
                        <img src={game.photos.cardLabel}/>
                        <div>
                            <div>{game.name}</div>
                            <div className={styles.watched}>Просмотрено в {game.platform}</div>
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
                    </div>
                </Link>
            </div>
        </div>
    )
}