import { FormComponentProps } from "./FormComponent.props"
import styles from './FormComponent.module.css'
import { Form } from "../Form/Form"
import { MessageBlock } from "../MessageBlock/MessageBlock"
import cn from 'classnames'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { useDispatch } from "react-redux"
import { FromToggleAction } from "../../redux/types/formToggleType"
import { Button } from "../Button/Button"
import { PersonalArea } from "../PersonalArea/PersonalArea"
import { FormAction } from "../../redux/types/formType"
import { BankCard } from "../BankCard/BankCard"
import { motion } from 'framer-motion'


export const FormComponent = ({...props}: FormComponentProps): JSX.Element => {

    const {formToggle, userData, cardToggle, cardNum} = useSelectorHook(state => state)
    const dispatch = useDispatch()

    const variants = {
        reg: {
            x: -20,
            y: -200,
        },
        in: {
            x: -350,
            y: -200,
        }
    }

    const toggleForm = () => {
            dispatch({type: FromToggleAction.TOGGLE_FORM})
            dispatch({type:  FormAction.INPUT_EMAIL, payload: ''}) 
            dispatch({type:  FormAction.INPUT_PASSWORD, payload: ''}) 
    }

    const salesInfo = () => {
        return (
            <div className={styles.SalesInfo}>
               <p>Оплата прошла успешно! <br/> Покупка совершена!</p>  
            </div>
        )
    }

    return (
        <div className={styles.FormComponent} {...props}>
           
            {
                userData.status
                ? <PersonalArea/>
                : 
                <>
                    <motion.div
                        className={styles.imgBlock}
                        variants={variants}
                        initial={'reg'}
                        animate={formToggle.formToggle ? 'in' :'reg'}
                    >
                        <img src="https://store.akamai.steamstatic.com/public/shared/images/login/join_pc.png?v=1"></img>
                        <p>{!formToggle.formToggle ? 'Если вы уже зарегистрировалить, то для входа нажми эту кнопку' : 'Прежде чем войти с начала надо зарегистрироваться'}</p>
                        <Button type="primary" onClick={() => toggleForm()}>{!formToggle.formToggle ? 'Войти' : 'Зарегистрироваться'}</Button>
                    </motion.div>
                    <Form/>
                </>
            }
            <MessageBlock/>
            {
                cardNum.cardSuccess
                ? salesInfo()
                : null
            }
            {
                cardToggle.toggle
                ? <BankCard/>
                : null
            }
        </div>
    )
}