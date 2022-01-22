import { paysAPI } from '../f1-dal/paysAPI'
import { call, put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import {
    deletePayType,
    getPaymentType,
    InitialStateType,
    PacksActionType,
    PayType,
    updatePayType,
} from './payTypes'
import { appAction } from '../../../main/m1-bll/app-reducer'

// reducer
export const paysReducer = (
    state: InitialStateType = initialState,
    action: PacksActionType
): InitialStateType => {
    switch (action.type) {
        case 'PAYS_REDUCER/GET_PAYS':
            return { ...state, pays: [...action.payload] }
        case 'PAYS_REDUCER/GET_PAY':
            return { ...state, pay: { ...action.payload } }
        case 'PAYS_REDUCER/SET_STATUS':
            return { ...state, payDelete: action.status }
        default:
            return state
    }
}
// state
const initialState = {
    pays: [] as PayType[],
    pay: {} as PayType,
    payDelete: false,
}
// action

export const paysAction = {
    getPays: (payload: PayType[]) =>
        ({ type: 'PAYS_REDUCER/GET_PAYS', payload } as const),
    getPay: (payload: PayType) =>
        ({ type: 'PAYS_REDUCER/GET_PAY', payload } as const),
    deleteStatus: (status: boolean) =>
        ({ type: 'PAYS_REDUCER/SET_STATUS', status } as const),
}

export const getPayList = () => ({ type: 'PAYS_REDUCER/INITIALIZE' })
export const getPayment = (id: string) => ({
    type: 'PAYS_REDUCER/GET_PAYMENT',
    id,
})

export const updatePay = (id: string, pay: PayType) => ({
    type: 'PAYS_REDUCER/UPDATE_PAY_INITIALIZE',
    id,
    payload: pay,
})
export const deletePay = (id: string) => ({
    type: 'PAYS_REDUCER/DELETE_PAY_INITIALIZE',
    id,
})

// Sagas

export function* getPaymentsWorkerSaga() {
    yield put(appAction.setStatusAC('loading'))
    try {
        const res: AxiosResponse<PayType[]> = yield call(paysAPI.getPays)
        if (res.status === 200) {
            yield put(paysAction.getPays(res.data))
        }
    } catch (error: any) {
        yield put(appAction.setErrorAC(error))
    } finally {
        yield put(appAction.setStatusAC('idle'))
    }
}

export function* getPaymentWorkerSaga(action: getPaymentType) {
    yield put(appAction.setStatusAC('loading'))
    try {
        const res: AxiosResponse<PayType> = yield call(
            paysAPI.getPay,
            action.id
        )
        if (res.status === 200) {
            yield put(paysAction.getPay(res.data))
        }
    } catch (error: any) {
        yield put(appAction.setErrorAC(error))
    } finally {
        yield put(appAction.setStatusAC('idle'))
    }
}

export function* updatePayWorkerSaga(action: updatePayType) {
    yield put(appAction.setStatusAC('loading'))
    try {
        const res: AxiosResponse<PayType> = yield call(
            paysAPI.updatePay,
            action.id,
            action.payload
        )
        yield put(paysAction.getPay(res.data))
    } catch (error: any) {
        yield put(appAction.setErrorAC(error))
    } finally {
        yield put(appAction.setStatusAC('idle'))
    }
}
export function* deletePayWorkerSaga(action: deletePayType) {
    yield put(appAction.setStatusAC('loading'))
    try {
        const res: AxiosResponse<PayType> = yield call(
            paysAPI.deletePay,
            action.id
        )
        yield put(paysAction.getPay(res.data))
        yield put(paysAction.deleteStatus(true))
    } catch (error: any) {
        yield put(appAction.setErrorAC(error))
    } finally {
        yield put(paysAction.deleteStatus(false))
        yield put(appAction.setStatusAC('idle'))
    }
}
