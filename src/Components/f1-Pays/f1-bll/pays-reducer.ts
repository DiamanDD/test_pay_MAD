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
}

export const gepPayList = () => ({ type: 'PAYS_REDUCER/INITIALIZE' })
export const updatePay = (id: string, pay: PayType) => ({
    type: 'PAYS_REDUCER/UPDATE_PAY_INITIALIZE',
    id,
    payload: pay,
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

// type

type updatePayType = ReturnType<typeof updatePay>
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
}
const initialState = {
    pays: [] as PayType[],
    pay: {} as PayType,
}
export type PacksActionType = InferActionTypes<typeof paysAction>
