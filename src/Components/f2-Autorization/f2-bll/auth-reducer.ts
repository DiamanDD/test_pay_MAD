import { put } from 'redux-saga/effects'
import { InferActionTypes } from '../../../helpers/types'

// reducer
export const authReducer = (
    state: AuthInitialType = initialState,
    action: AuthActionType
): AuthInitialType => {
    switch (action.type) {
        case 'AUTH_REDUCER/AUTHORIZED':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

// state
const initialState: AuthInitialType = {
    isAuth: false,
    testLogin: 'Guest',
    testPassword: 'Guest12345@',
}

// action

export const authAction = {
    getPays: (payload: { isAuth: boolean }) =>
        ({ type: 'AUTH_REDUCER/AUTHORIZED', payload } as const),
}

export const authorizeAction = (login: string, password: string) => ({
    type: 'AUTH_REDUCER/INITIALIZE',
    login,
    password,
})

// Saga
export function* authWorkerSaga(action: authorizeActionType) {
    if (
        action.login === initialState.testLogin &&
        action.password === initialState.testPassword
    ) {
        yield put(authAction.getPays({ isAuth: true }))
    } else {
        alert('логин не верный')
    }
}

// type
type AuthInitialType = {
    isAuth: boolean
    testLogin: string
    testPassword: string
}

export type AuthActionType = InferActionTypes<typeof authAction>
type authorizeActionType = ReturnType<typeof authorizeAction>
