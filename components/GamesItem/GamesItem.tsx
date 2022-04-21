import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { Games } from "../../interfaces/dataInterfase"
import { GamesItemProps } from "./GamesItem.props"
import Link from 'next/link'
import styles from './GamesItem.module.css'

import cn from 'classnames'
import { WatchedAction } from "../../redux/types/watchedTypes"
import { format } from "date-fns"
import { addWatched } from "../../helpers/functions"
export const GamesItem = ({game, ...props}: GamesItemProps): JSX.Element => {
    const dispatch = useDispatch()
    const {gamesList, menuList} = useSelectorHook(state => state) 
    const [onFocus, setOnFocus] = useState<boolean>(false)
    const router = useRouter()
    const [activeGenre, setActiveGenre] = useState<string>()

    return (
        <>
            <Link href={`/games/${game.alias}`}>
                <div
                {...props}
                key={game.alias} 
                className={cn(styles.GameItem, {
                    [styles.active]: onFocus
                })}
                onMouseEnter={() => setOnFocus(true)}
                onMouseLeave={() => setOnFocus(false)}
                onClick={() => addWatched(game)}
                >
                    <div className={styles.GameItemImage}>
                        {
                            onFocus
                            ? <video loop muted autoPlay src={game.video}/>
                            : <img src={game.photos.cardLabel}/>
                        }
                    </div>
                    <div className={styles.GameItemInfo}>
                    
                        <p>{game.name}</p>
                        <p>{game.genre}</p>
                        {
                            game.sales.status
                            ?  <p className={styles.GameItemPriceSale}>
                                    <span>{game.sales.value}%</span>
                                    <span>{game.price}руб.</span>
                                    <span>{game.price -  Math.round((game.price / 100) * game.sales.value)} руб.</span>
                                </p> 
                            : <p className={styles.GameItemPrice}>{game.price} руб.</p> 
                        }
                    
                        <p></p>
                    </div>
                </div>
            </Link>   
        </>  
    )
}
