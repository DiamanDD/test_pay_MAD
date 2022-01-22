import { AppStateType } from '../../../main/m1-bll/appTypes'

export const getPays = (state: AppStateType) => state.paysReducer.pays
export const getStatePay = (state: AppStateType) => state.paysReducer.pay
export const deleteStatus = (state: AppStateType) => state.paysReducer.payDelete
