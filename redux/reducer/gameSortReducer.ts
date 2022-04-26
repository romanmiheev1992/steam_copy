import { GameAction, GameActions, GameSort, GameSortActions, GameType } from "../types/gamesType"

export const initialState: GameType = {
    games: []
}

export const gamesSortReducer = (state = initialState, action: GameSortActions): GameType => {
    switch(action.type) {
        case GameSort.GET_GAME:
            return {games: state.games = action.payload}
        // case GameSort.GAME_SORT_ROUTE:
        //     return {
        //         games: state.games.filter(game => game.bestSeller)
        //     }
        default:
            return state
    }
}