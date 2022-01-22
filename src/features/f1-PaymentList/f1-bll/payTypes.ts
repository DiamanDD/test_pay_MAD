import { InferActionTypes } from '../../../main/m1-bll/appTypes'
import { deletePay, getPayment, paysAction, updatePay } from './pays-reducer'

export type updatePayType = ReturnType<typeof updatePay>
export type getPaymentType = ReturnType<typeof getPayment>
export type deletePayType = ReturnType<typeof deletePay>
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
    payDelete: boolean
}

export type PacksActionType = InferActionTypes<typeof paysAction>
