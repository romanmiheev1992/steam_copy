import { FormComponentProps } from "./FormComponent.props"
import styles from './FormComponent.module.css'
import { Form } from "../Form/Form"
import { MessageBlock } from "../MessageBlock/MessageBlock"
import cn from 'classnames'
import { useEffect, useState } from "react"
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { useDispatch } from "react-redux"
import { FromToggleAction } from "../../redux/types/formToggleType"
import { Button } from "../Button/Button"
import { PersonalArea } from "../PersonalArea/PersonalArea"



export const FormComponent = ({...props}: FormComponentProps): JSX.Element => {

    const {formToggle, userData} = useSelectorHook(state => state)
    const dispatch = useDispatch()
    
    // console.log(userData.status)

    return (
        <div className={styles.FormComponent} {...props}>
           
            {
                userData.status
                ? <PersonalArea/>
                : 
                <>
                    <div className={cn(styles.FormBlock, {
                        [styles.regPosition]: formToggle.formToggle
                    })}> 
                    <div className={styles.imgBlock}>
                        <img src="https://store.akamai.steamstatic.com/public/shared/images/login/join_pc.png?v=1"></img>
                        <p>{!formToggle.formToggle ? 'Если вы уже зарегистрировалить, то для входа нажми эту кнопку' : 'Прежде чем войти с начала надо зарегистрироваться'}</p>
                        <Button type="primary" onClick={() => dispatch({type: FromToggleAction.TOGGLE_FORM})}>{!formToggle.formToggle ? 'Войти' : 'Зарегистрироваться'}</Button>
                    </div>
                    <Form/>
                    </div>
                    <MessageBlock />
                 </>
            }
            
        </div>
    )
}