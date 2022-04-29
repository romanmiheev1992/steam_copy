import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { Games } from "../../interfaces/dataInterfase"
import { GamesListProps } from "./GamesListPop.props"
import styles from './GamesListPop.module.css'
import { GamesItem } from "../GamesItem/GamesItem"
import { SortSection } from "../SortSection/SortSection"
import { GameActions, GameSort } from "../../redux/types/gamesType"

export const GamesListPop = ({...props}: GamesListProps): JSX.Element => {

    const {gamesList} = useSelectorHook(state => state) 
    const router = useRouter()
    const [game, setGame] = useState<Games[]>([])
    const [activeGenre, setActiveGenre] = useState<string>('Экшен')
    const [sortSet, setSortSet] = useState<string>('')
    const [activeSection, setActiveSection] = useState<string>('')


    useEffect(() => {
        sortPrice()
    }, [sortSet])
    
    useEffect(() => {
        currentPage()
       
    }, [])

    useEffect(() => {
        sortPrice()
    }, [sortSet])

    useEffect(() => {
        currentPage()
    }, [router])

    useEffect(() => {
        onChangeGenre()
    }, [activeGenre])

    const onChangeGenre = () => {

        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'bestsaler') {
              setGame(gamesList.games.filter(game => game.bestSeller && game.genre === activeGenre))
        }
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'popular&new') {
            setGame(gamesList.games.filter(game => game.new && game.genre === activeGenre))
        }
    }

    const sortPrice = () => {

        if(sortSet === 'по возрастанию') {
            return setGame(game.sort((a, b) => b.price - a.price))
        }

        if(sortSet === 'по убыванию') {
            return setGame(game.sort((a, b) => a.price - b.price ))
        }
    }
    

    const currentPage = () => {
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'bestsaler') {
            setGame(gamesList.games.filter(game => game.bestSeller))
            setActiveSection("Лидеры продаж")
        } else
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'popular&new') {
            setGame(gamesList.games.filter(game => game.new))
            setActiveSection("Популярные новинки")
        }
    }

    return (
        <div className={styles.GameList} {...props}>
            <SortSection activeGenre={setActiveGenre}/>
            <h3>{activeSection}</h3>
            {
                game && game.map((game: Games, i: number) => (
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