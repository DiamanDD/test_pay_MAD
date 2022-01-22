import { instance } from '../../../main/m2-dal/API'
import { PayType } from '../f1-bll/payTypes'

export const paysAPI = {
    getPays() {
        return instance.get(`/pays`)
    },
    getPay(id: string) {
        return instance.get(`/pays/${id}`)
    },
    updatePay(id: string, pay: PayType) {
        return instance.put(`/pays/${id}`, pay)
    },
    deletePay(id: string) {
        return instance.delete(`/pays/${id}`)
    },
}
