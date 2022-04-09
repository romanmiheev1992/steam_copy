import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { gamesReducer } from "../reducer/gameReducer";
import { menuListReducer } from "../reducer/menuReducer";
import { menuToggleReducer } from "../reducer/menuToggleReducer";
import { rootSaga } from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware()

export const rootReducer = combineReducers({
    menuToggle: menuToggleReducer,
    gamesList: gamesReducer,
    menuList: menuListReducer
})

export type RootType = ReturnType <typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)