import { useSelectorHook } from "../../hooks/useSelectorHook";
import { SearchProps } from "./Serch.props";
import styles from './Serch.module.css'
import { useState } from "react";


export const Search  = ({...props}: SearchProps): JSX.Element => {
    const [serachValue, useSearchValue] = useState<string>('')
    const {gamesList} = useSelectorHook(state => state)

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
                    serachValue && searchList.map((item, i) => (
                        i < 10
                        ?<div key={i} className={styles.GameBlock}>
                            <img src={item.photos.smallCard} />
                            <div>
                                <span>{item.name}</span> 
                                <span>{item.price} руб.</span> 
                            </div>

                        </div>
                        : null
                    ))
                }
            </div>
           
        </div>
    )
}