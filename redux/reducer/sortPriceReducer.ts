import { SortListAction, SortReducerType, SortUp } from "../types/sortReducerType";

export const initialState: SortReducerType = {
    sortedList: ''
}

export const sortPriceReducer = (state = initialState, action: SortUp): SortReducerType => {
    switch(action.type) {
        case SortListAction.SORT:
            return {sortedList: state.sortedList = action.payload}
        default:
            return state;
    }
}