import { put } from 'redux-saga/effects'
import {
    AuthActionType,
    AuthInitialType,
    authorizeActionType,
} from './authTypes'
import { appAction } from '../../../main/m1-bll/app-reducer'

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
    yield put(appAction.setStatusAC('loading'))

    try {
        yield put(appAction.setErrorAC(''))
        if (
            action.login === initialState.testLogin &&
            action.password === initialState.testPassword
        ) {
            yield put(authAction.getPays({ isAuth: true }))
        } else {
            throw new Error('логин или пароль не верный')
        }
    } catch (error: any) {
        yield put(appAction.setErrorAC(error))
    } finally {
        yield put(appAction.setStatusAC('idle'))
    }
}
