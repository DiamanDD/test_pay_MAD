import { InferActionTypes } from '../../helpers/types'

// reducer
export const appReducer = (
    state: InitialStateType = initialState,
    action: AppActionType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
        case 'APP/SET_ERROR':
            return { ...state, status: action.status }
        default:
            return state
    }
}

// state
const initialState: InitialStateType = {
    error: null,
    status: 'idle',
}

// action
export const appAction = {
    setStatusAC: (status: StatusType) =>
        ({ type: 'APP/SET_STATUS', status } as const),
    setErrorAC: (status: StatusType) =>
        ({ type: 'APP/SET_ERROR', status } as const),
}

// type
type InitialStateType = {
    error: string | null
    status: StatusType
}

export type StatusType = 'idle' | 'loading'
export type displayStateType = 'My' | 'All'
export type AppActionType = InferActionTypes<typeof appAction>
