import { AppStateType } from './appTypes'

export const getStatus = (state: AppStateType) => state.appReducer.status
export const getApiError = (state: AppStateType) => state.appReducer.error
