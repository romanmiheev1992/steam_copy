import { PersonalAreaProps } from "./PersonalArea.props"
import styles from './PersonalArea.module.css'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { CalcBlock } from "../CalcBlock/CalcBlock"
import { Button } from "../Button/Button"
import { useRouter } from "next/dist/client/router"
import { useDispatch } from "react-redux"
import { GameBasketAction } from "../../redux/types/gameBasketType"
import { useEffect, useState } from "react"
import { Games } from "../../interfaces/dataInterfase"
import { UserDataAction } from "../../redux/types/userDataType"

export const PersonalArea = ({...props}: PersonalAreaProps): JSX.Element => {
    const {userData, gameBasket} = useSelectorHook(state => state)
    const router = useRouter()
    const dispatch = useDispatch()

    const deleteGame = (alias: string) => {
        dispatch({type: GameBasketAction.FILTER_GAMES, payload: alias})
    }


    const exit = () => {
        dispatch({type: UserDataAction.CLEAR_USER})
        localStorage.removeItem('name')
        dispatch({type: GameBasketAction.DELETE_ALL_GAMES})
        router.push('/')
    }

    return (
        <div className={styles.PersonalArea} {...props}>
            <h3>Личный кабинет</h3>
            <p>Пользователь: {userData.email}</p>
            <h4>Корзина</h4>
            <div className={styles.PersonalAreaBlocks}>
                <div>
                    {
                        gameBasket.games && gameBasket.games.map(game => (
                            <div 
                                key={game.alias}
                                className={styles.GameBasketBlock}
                            >
                                <img src={game.photos.smallCard}/>
                                <p> {game.name}</p>
                                {
                                    game.sales.status
                                    ?  <p>{game.price -  Math.round((game.price / 100) * game.sales.value)} руб.</p>
                                    :  <p>{game.price} руб.</p>
                                }
                                <Button onClick={() => deleteGame(game.alias)} type='primary'>Удалить</Button>
                            </div>
                            
                        ))
                    }
                </div>
                <CalcBlock/>    
            </div>
            
            <Button type='primary' onClick={() => exit()}>Выход</Button>
            
        </div>
    )
}