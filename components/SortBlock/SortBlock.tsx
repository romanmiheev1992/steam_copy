import { SortBlockProps } from "./SortBlock.props"
import styles from './SortBlock.module.css'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { useEffect, useState } from "react"
import { Games } from "../../interfaces/dataInterfase"


export const SortBlock = ({...props}: SortBlockProps): JSX.Element => {

    const [games, setGames] = useState<Games[]>([])
    const [photos, setPhotos] = useState<Games>(games[0])

    const {gamesList} = useSelectorHook(state => state)

    useEffect(() => {
        setGames(gamesList.games.filter(game => game.bestSeller))
        setPhotos(gamesList.games[0])
    }, [])
    

    const sortClick = (e) => {

        if(e.target.outerText === 'Лидеры продаж') {
            setGames(gamesList.games.filter(game => game.bestSeller))
        }
        if(e.target.outerText === 'Популярные новинки') {
            setGames(gamesList.games.filter(game => game.new))
        }
        if(e.target.outerText === 'Скидки') {
            setGames(gamesList.games.filter(game => game.sales.status))
        }
    }

    const onMouseEnter = (name:string) => {
       {
        games.map(game => {
            if(game.name === name) {
                setPhotos(game)
            }
        })
       }
    
    }

    return (
        <div className={styles.SortBlock}>
            <div className={styles.SortBlockLabel}>
                <ul onClick={(e) => sortClick(e)}>
                    <li>Лидеры продаж</li>
                    <li>Популярные новинки</li>
                    <li>Скидки</li>
                </ul>
            </div>
            <div className={styles.SortBlockGames}>
                {
                    games && games.map((game, i) => (
                        i < 8
                        ?<div 
                            key={game.name}
                            className={styles.GameBlock}
                            onMouseEnter={() => onMouseEnter(game.name)}
                         >
                            <img src={game.photos.smallCard} />
                            <div className={styles.GameText} >
                                <span>{game.name}</span> 
                                <span>{game.genre}</span> 
                            </div>
                            <div className={styles.GamePrice} >
                                {
                                    game.sales.status
                                    ?  
                                        <div>
                                            <span>{game.sales.value}%</span>
                                            <span>{game.price}руб.</span>
                                            <span>{game.price -  Math.round((game.price / 100) * game.sales.value)} руб.</span>
                                        </div>
                                    :  <span>{game.price} руб.</span> 
                                }
                            </div>
                        </div>
                        : null
                    ))
                }
            </div>
            <div className={styles.SortBlockPhotos}>  
                {
                  photos && photos.photos.cardImageListBig.map((photo, i) => {
                       if(i < 3) {
                           return <img src={photo}/>
                       }
                   })
                }
            </div>
        </div>
    ) 
}