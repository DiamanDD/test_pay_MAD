import { paysAPI } from '../f1-dal/paysAPI'
import { call, put } from 'redux-saga/effects'
import { InferActionTypes } from '../../../helpers/types'
import { AxiosResponse } from 'axios'

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
        case "PAYS_REDUCER/SET_STATUS":
            return {...state,payDelete:action.status}
        default:
            return state
    }
}

// action

export const paysAction = {
    getPays: (payload: PayType[]) =>
        ({ type: 'PAYS_REDUCER/GET_PAYS', payload } as const),
    getPay: (payload: PayType) =>
        ({ type: 'PAYS_REDUCER/GET_PAY', payload } as const),
    deleteStatus: (status:boolean) =>
        ({ type: 'PAYS_REDUCER/SET_STATUS', status } as const),
}

export const gepPayList = () => ({ type: 'PAYS_REDUCER/INITIALIZE' })
export const updatePay = (id: string, pay: PayType) => ({
    type: 'PAYS_REDUCER/UPDATE_PAY_INITIALIZE',
    id,
    payload: pay,
})
export const deletePay = (id: string) => ({
    type: 'PAYS_REDUCER/DELETE_PAY_INITIALIZE',
    id
})

// Sagas
export function* getPacksWorkerSaga() {
    const res: AxiosResponse<PayType[]> = yield call(paysAPI.getPays)
    if (res.status === 200) {
        yield put(paysAction.getPays(res.data))
    }
}

export function* updatePayWorkerSaga(action: updatePayType) {
    const res: AxiosResponse<PayType> = yield call(
        paysAPI.updatePay,
        action.id,
        action.payload
    )
    yield put(paysAction.getPay(res.data))
}
export function* deletePayWorkerSaga(action: deletePayType) {
    try{
        const res: AxiosResponse<PayType> = yield call(
            paysAPI.deletePay,
            action.id,
        )
        yield put(paysAction.getPay(res.data))
        yield put(paysAction.deleteStatus(true))
    }
    catch (err){

    }
    finally {
        yield put(paysAction.deleteStatus(false))
    }

}

// type

type updatePayType = ReturnType<typeof updatePay>
type deletePayType = ReturnType<typeof deletePay>
export type PayType = {
    createdAt: Date
    name: string
    avatar: string
    sum: string
    city_name: string
    id: string
}
export type InitialStateType = {
    pays: PayType[]
    pay: PayType
    payDelete:boolean
}
const initialState = {
    pays: [] as PayType[],
    pay: {} as PayType,
    payDelete:false,
}
export type PacksActionType = InferActionTypes<typeof paysAction>
