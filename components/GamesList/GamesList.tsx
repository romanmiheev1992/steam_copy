import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { Games } from "../../interfaces/dataInterfase"
import { GamesListProps } from "./GamesList.props"
import styles from './GamesList.module.css'
import { GamesItem } from "../GamesItem/GamesItem"

export const GamesList = ({...props}: GamesListProps): JSX.Element => {

    const {gamesList} = useSelectorHook(state => state) 
    const router = useRouter()
    const [activeGenre, setActiveGenre] = useState<string>()

    const currentGenre = () => {
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'action') {
            setActiveGenre('Экшен')
        } else
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'adventure') {
            setActiveGenre('Приключения')
        } else
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'roles') {
            setActiveGenre('Ролевые')
        }else
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'simulator') {
            setActiveGenre('Симулятор')
        }else
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'strategy') {
            setActiveGenre('Стратегия')
        }
    }

    useEffect(() => {
        currentGenre()
     }, [router])

    return (
        <div className={styles.GameList}>
            {
               gamesList.games && gamesList.games.map((game: Games, i: number) => (
                    game.genre === activeGenre
                    ?
                    <GamesItem 
                    key={game.alias} 
                    game={game}
                    />
                    : null
                ))
            }
            
        </div>
    )
}