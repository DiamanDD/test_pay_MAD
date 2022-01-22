import { appAction } from './app-reducer'
import { rootReducer } from './root-reducer'
export type AppStateType = ReturnType<typeof rootReducer>

export type InitialStateType = {
    error: ErrorType
    status: StatusType
}
export type ErrorType = string | null
export type StatusType = 'idle' | 'loading'
export type displayStateType = 'My' | 'All'
export type AppActionType = InferActionTypes<typeof appAction>

export type InferActionTypes<T> = T extends {
    [keys: string]: (...args: any[]) => infer U
}
    ? U
    : never

export type ErrorAppType = StringOrNullType | undefined
export type StringOrNullType = string | null
export type NumberOrNullType = number | null
