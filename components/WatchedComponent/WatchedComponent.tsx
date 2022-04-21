import { WatchedComponentProps } from "./WatchedComponent.props"
import styles from './WatchedComponent.module.css'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import Link from "next/link"
import { LastWatchedComponent } from "./LastWatchedComponent/LastWatchedComponent"
import { Price } from "../GameComponent/Price/Price"
import { Button } from "../Button/Button"


export const WatchedComponent = ({...props}: WatchedComponentProps): JSX.Element => {

    const {watchedList} = useSelectorHook(state => state.watchedList)

    return (
        <div className={styles.WatchedComponent} {...props}>
            <h4>Недавно просмотренные</h4>
            <div className={styles.WatchedComponentBlock}>
                {
                    watchedList && watchedList.map((game, i) => (
                        i === 0
                        ? <LastWatchedComponent key={i} game={game}/>
                        :
                        <Link key={i} href={`/games/${game.alias}`}>
                            <div className={styles.GameSection}>
                                <img src={game.photos.smallCard}/>
                                <div>{game.name}</div>
                                <div>Просмотрено в {game.platform}</div>
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
                        </Link>
                        
                    ))
                }
            </div>
           
        </div>
    )
}