import { AppStateType } from '../../../main/m1-bll/appTypes'

export const isAuth = (state: AppStateType) => state.authReducer.isAuth
