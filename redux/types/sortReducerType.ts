
export interface SortReducerType {
    sortedList: string
}

export enum SortListAction {
    SORT = 'SORT'
}

export interface SortUp {
    type: SortListAction.SORT,
    payload: string
}
