import { instance } from '../../../API/API'
import { PayType } from '../f1-bll/pays-reducer'

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
