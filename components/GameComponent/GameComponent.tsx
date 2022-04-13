import { useRouter } from "next/dist/client/router"
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { GameComponentProps } from "./GameComponent.props"
import styles from './GameComponent.module.css'
import { useEffect, useState } from "react"
import { Slider } from "./Slider/Slider"

export const GameComponent = ({...props}: GameComponentProps): JSX.Element => {
    const [sliderCounter, setSliderCounter] = useState(0)
    const {gamesList} = useSelectorHook(state => state)
    const router = useRouter()

    return (
        <div className={styles.GameComponent} {...props}>
            {
                gamesList.games && gamesList.games.map(game => (
                  router.asPath === `/games/${game.alias}`
                   ?<div key={game.alias}>
                       <Slider  photos={game.photos} num={sliderCounter}/>
                    </div>
                   : null
                ))
            }

            <button onClick={() => setSliderCounter(sliderCounter + 1)}>следующий</button>
            <button onClick={() => setSliderCounter(sliderCounter - 1)}>ghtkd</button>
        </div>
    )
}