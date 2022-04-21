import axios from "axios"
import {store} from '../redux/store/store'
import { StatusAction } from "../redux/types/statusType"

export const fetchForm = async (data) => {
         await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKPxmA1EASQcVrSG-cic-cEkV8onRDlgI', data)
        .then(res => store.dispatch({type: StatusAction.GET_STATUS, payload: res}))
        .catch((e) => store.dispatch({type: StatusAction.GET_STATUS, payload: e}))

}

export const signIn = async (data) => {
         await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKPxmA1EASQcVrSG-cic-cEkV8onRDlgI', data)
        .then(res => store.dispatch({type: StatusAction.GET_STATUS, payload: res}))
        .catch((e) => store.dispatch({type: StatusAction.GET_STATUS, payload: e}))
}