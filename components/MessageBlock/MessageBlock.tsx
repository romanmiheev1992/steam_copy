import { MessageBlockProps } from "./MessageBlock.props"
import styles from './MessageBlock.module.css'
import cn from 'classnames'
import { useSelectorHook } from "../../hooks/useSelectorHook"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { UserDataAction } from "../../redux/types/userDataType"
import { StatusAction } from "../../redux/types/statusType"


export const MessageBlock = ({...props}: MessageBlockProps): JSX.Element => {

    const {status} = useSelectorHook(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('name')) {
            dispatch({type: UserDataAction.ADD_USER, payload: localStorage.getItem('name')})
        }
    }, [])

    useEffect(() => {
       if(status.status.data && status.status.data.registered) {
            localStorage.setItem('name', status.status.data.email)
            dispatch({type: UserDataAction.ADD_USER, payload: status.status.data.email})
            dispatch({type: StatusAction.DELETE_STATUS})
            console.log('this')
       }
       if(localStorage.getItem('name')) {
            dispatch({type: UserDataAction.ADD_USER, payload: localStorage.getItem('name')})
       }
    }, [status])
    
    return (
        <div className={cn(styles.MessageBlock, {
            [styles.showSuccess]: status.status.status == 200,
            [styles.showError]: status.status.status == 400,
            [styles.showEnter]: status.status.data && status.status.data.registered,
            [styles.showErrorExistEmail]: status.status.response && status.status.response.data.error.message === 'EMAIL_EXISTS',
            [styles.showErrorInvalidPassword]: status.status.response && status.status.response.data.error.message === 'INVALID_PASSWORD',
            [styles.showErrorEmailNotFound]: status.status.response && status.status.response.data.error.message === 'EMAIL_NOT_FOUND'
        })} {...props}>
            {
                status.status.response && status.status.response.data.error.message === 'EMAIL_NOT_FOUND'
                ? <p>Вы не зарегистрированы!</p>
                :status.status.response && status.status.response.data.error.message === 'INVALID_PASSWORD'
                ? <p>Неправильный пароль!</p>
                :status.status.response && status.status.response.data.error.message === 'EMAIL_EXISTS'
                ? <p>Такой Email уже существует!</p>
                : status.status.data && status.status.data.registered 
                ? <p>Вы вошли в свой кабинет!</p>
                :status.status.status && status.status.status == 200
                ? <p>Вы успешно зарегистрировались</p>
                : status.status.status && status.status.status == 400
                ? <p>Что-то пошло не так!</p>
                : null

            } 
        </div>
    )
}