import { useSelectorHook } from "../../hooks/useSelectorHook";
import { SearchProps } from "./Serch.props";
import styles from './Serch.module.css'
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { WatchedAction } from "../../redux/types/watchedTypes";
import { format } from "date-fns";
import { Games } from "../../interfaces/dataInterfase";
import { addWatched } from "../../helpers/functions";


export const Search  = ({...props}: SearchProps): JSX.Element => {
    const [serachValue, useSearchValue] = useState<string>('')
    const {gamesList} = useSelectorHook(state => state)
    const dispatch = useDispatch()
    const searchList = gamesList.games&& gamesList.games.filter(game => {
        return game.name.toLowerCase().includes(serachValue.toLowerCase())
    })

    const onChange = (e) => {
        useSearchValue(e.target.value)
    }


    return (
        <div 
        {...props}
        className={styles.Search}
        >
            <input 
                placeholder="поиск игр..." 
                onChange={onChange}
            />
            <div className={styles.SeachResult}>
                 {
                    serachValue && searchList.map((game, i) => (
                        i < 10
                        ?
                        <Link key={game.alias} href={`/games/${game.alias}`}>
                            <div  
                                className={styles.GameBlock}
                                onClick={() => addWatched(game)}
                            >
                                <img src={game.photos.smallCard} />
                                <div>
                                    <span>{game.name}</span> 
                                    <span>{game.price} руб.</span> 
                                </div>

                            </div>
                        </Link>
                        : null
                    ))
                }
            </div>
           
        </div>
    )
}