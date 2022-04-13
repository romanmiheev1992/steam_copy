import { SortBlockProps } from "./SortBlock.props"
import styles from './SortBlock.module.css'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { useEffect, useState } from "react"
import { Games } from "../../interfaces/dataInterfase"



export const SortBlock = ({...props}: SortBlockProps): JSX.Element => {
    
    const {gamesList} = useSelectorHook(state => state)
    const [games, setGames] = useState<Games[]>(gamesList.games)
    const [photos, setPhotos] = useState<Games>(games[0])

    useEffect(() => {
        setGames(gamesList.games)
    }, [gamesList])

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

    const onMouseEnter = (name: string) => {
       {
            games.map(game => {
                if(game.name === name) {
                    setPhotos(game)
                }
            })
       }
    }

    return (
        <div {...props} className={styles.SortBlock}>
            <div className={styles.SortBlockLabel}>
                <ul onClick={sortClick}>
                    <li>Лидеры продаж</li>
                    <li>Популярные новинки</li>
                    <li>Скидки</li>
                </ul>
            </div>
            <div className={styles.SortBlockGames}>
                {
                    games && games.map((game: Games, i: number) => (
                        i < 11
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
                <p>{photos && photos.name}</p>
                {
                  photos && photos.photos.cardImageListBig.map((photo: string, i: number) => {
                       if(i < 4) {
                           return <img key={i} src={photo}/>
                       }
                   })
                }
            </div>
        </div>
    ) 
}