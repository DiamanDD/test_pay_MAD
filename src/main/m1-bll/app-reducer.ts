import {
    AppActionType,
    ErrorType,
    InitialStateType,
    StatusType,
} from './appTypes'

// reducer
export const appReducer = (
    state: InitialStateType = initialState,
    action: AppActionType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return { ...state, status: action.status }
        case 'APP/SET_ERROR':
            return { ...state, error: action.status }
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
    setErrorAC: (status: ErrorType) =>
        ({ type: 'APP/SET_ERROR', status } as const),
}
