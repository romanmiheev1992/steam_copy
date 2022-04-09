import { Games } from "../../interfaces/dataInterfase";

export interface GameType{
    games: Games[]
}

export enum GameActions {
    GET_GAMES_CONTENT = 'GET_GAMES_CONTENT'
}

export interface GamesGetContent {
    type: GameActions.GET_GAMES_CONTENT,
    payload: Games[]
}