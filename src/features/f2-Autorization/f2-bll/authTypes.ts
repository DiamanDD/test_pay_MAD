import { InferActionTypes } from '../../../main/m1-bll/appTypes'
import { authAction, authorizeAction } from './auth-reducer'

export type AuthInitialType = {
    isAuth: boolean
    testLogin: string
    testPassword: string
}
export type AuthActionType = InferActionTypes<typeof authAction>
export type authorizeActionType = ReturnType<typeof authorizeAction>
