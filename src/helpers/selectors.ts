import { AppStateType } from '../Components/store/root-reducer'

export const getPAys = (state: AppStateType) => state.paysReducer.pays
export const getStatus = (state: AppStateType) => state.appReducer.status
export const isAuth = (state: AppStateType) => state.authReducer.isAuth
export const statePay = (state: AppStateType) => state.paysReducer.pay
export const deleteStatus = (state: AppStateType) => state.paysReducer.payDelete
