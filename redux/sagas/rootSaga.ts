import { spawn, takeEvery } from "redux-saga/effects";


export function* fetchData() {
    
}

export function* sagaWatcher() {
   
}

export function* rootSaga() {
    yield spawn(sagaWatcher)
}