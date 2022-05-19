import axios from "axios"
import {store} from '../redux/store/store'
import { StatusAction } from "../redux/types/statusType"

export const fetchForm = async (data) => {
         await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDD7FnikiJSjtzxPlmK28sBLfQTZc1h5lc', data)
        .then(res => store.dispatch({type: StatusAction.GET_STATUS, payload: res}))
        .catch((e) => store.dispatch({type: StatusAction.GET_STATUS, payload: e}))

}

export const signIn = async (data) => {
         await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDD7FnikiJSjtzxPlmK28sBLfQTZc1h5lc', data)
        .then(res => store.dispatch({type: StatusAction.GET_STATUS, payload: res}))
        .catch((e) => store.dispatch({type: StatusAction.GET_STATUS, payload: e}))
}