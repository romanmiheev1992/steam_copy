import { GameActions, GamesGetContent, GameType } from "../types/gamesType"

export const initialState: GameType = {
    games: []
}

export const gamesReducer = (state = initialState, action: GamesGetContent): GameType => {
    switch(action.type) {
        case GameActions.GET_GAMES_CONTENT:
            return { games: state.games = action.payload}
        default:
            return state
    }
}