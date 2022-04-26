export interface CardToggleType {
    toggle: boolean
}

export enum CardToggleAction {
    TOGGLE_CARD = 'TOGGLE_CARD'
}

export interface CardToggle {
    type: CardToggleAction.TOGGLE_CARD
}