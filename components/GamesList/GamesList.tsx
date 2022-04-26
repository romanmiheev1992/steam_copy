import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { Games } from "../../interfaces/dataInterfase"
import { GamesListProps } from "./GamesList.props"
import styles from './GamesList.module.css'
import { GamesItem } from "../GamesItem/GamesItem"
import { SortSection } from "../SortSection/SortSection"
import { motion } from "framer-motion"
export const GamesList = ({...props}: GamesListProps): JSX.Element => {

    const {gamesList} = useSelectorHook(state => state) 
    const router = useRouter()
    const [activeGenre, setActiveGenre] = useState<string>()
    const [sortSet, setSortSet] = useState<boolean>(false)
    const [currentList, setCurrentList] = useState<Games[]>([])

    // useEffect(() => {
    //     // setCurrentList(gamesList.games.sort())
    //     sortPrice()

    //     console.log(sortSet)
    // }, [sortSet])

     useEffect(() => {
       setSortSet(true)
    }, [sortSet])

    useEffect(() => {
        if(sortSet) {
             setCurrentList(currentList.sort((a, b) => a.price - b.price))
        }
    })



    // useEffect(() => {
    //     sortPrice()
    // })

    useEffect(() => {
            currentGenre()
    }, [currentList])

    useEffect(() => {
        setCurrentList(gamesList.games.sort())
    }, [])

    const currentGenre = () => {
        if(router.asPath.split('/')[router.asPath.split('/').length -1] === 'action') {
            setActiveGenre('Экшен')
            setSortSet(false)
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

    // const sortPrice = () => {
    //     if(sortSet == 'по убыванию') {
    //        return setCurrentList(currentList.sort((a, b) => a.price - b.price))
    //     }

    //     if(sortSet == 'по возрастанию') {
    //         return setCurrentList(currentList.sort((a, b) => b.price - a.price))
    //     }
    // }

     return (
        <div className={styles.GameList} {...props}>

             <SortSection activeGenre={setActiveGenre} sort={setSortSet}/>
            <h3>{activeGenre}</h3>
                    {
                        currentList && currentList.map((game: Games, i: number) => (
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