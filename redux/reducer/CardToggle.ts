import { CardToggle, CardToggleAction, CardToggleType } from "../types/cardToggleType"


export const initialState: CardToggleType = {
    toggle: false
}

export const cardToggleReducer = (state = initialState, action: CardToggle): CardToggleType => {
    switch(action.type) {
        case CardToggleAction.TOGGLE_CARD:
            return {toggle: state.toggle = !state.toggle}
        default:
            return state
    }
}