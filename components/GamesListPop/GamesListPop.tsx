import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { Games } from "../../interfaces/dataInterfase"
import { GamesListProps } from "./GamesListPop.props"
import styles from './GamesListPop.module.css'
import { GamesItem } from "../GamesItem/GamesItem"

export const GamesListPop = ({...props}: GamesListProps): JSX.Element => {

    const {gamesList} = useSelectorHook(state => state) 
    const router = useRouter()
    const [game, setGame] = useState<Games[]>()

    const currentGenre = () => {
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'bestsaler') {
            setGame(gamesList.games.filter(game => game.bestSeller))
        } else
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'popular&new') {
            setGame(gamesList.games.filter(game => game.new))
        }
    }

    useEffect(() => {
        currentGenre()
     }, [router])

    return (
        <div className={styles.GameList}>
            {
               game && game.map((game: Games, i: number) => (
                    <GamesItem 
                    key={game.alias} 
                    game={game}
                    />
                ))
            }
            
        </div>
    )
}