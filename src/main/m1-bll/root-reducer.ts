import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { takeEvery } from 'redux-saga/effects'
import {
    deletePayWorkerSaga,
    getPaymentsWorkerSaga,
    getPaymentWorkerSaga,
    paysReducer,
    updatePayWorkerSaga,
} from '../../features/f1-PaymentList/f1-bll/pays-reducer'
import {
    authReducer,
    authWorkerSaga,
} from '../../features/f2-Autorization/f2-bll/auth-reducer'
import { appReducer } from './app-reducer'

export const rootReducer = combineReducers({
    paysReducer,
    authReducer,
    appReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('PAYS_REDUCER/GET_PAYMENT', getPaymentWorkerSaga)
    yield takeEvery('PAYS_REDUCER/INITIALIZE', getPaymentsWorkerSaga)
    yield takeEvery('AUTH_REDUCER/INITIALIZE', authWorkerSaga)
    yield takeEvery('PAYS_REDUCER/UPDATE_PAY_INITIALIZE', updatePayWorkerSaga)
    yield takeEvery('PAYS_REDUCER/DELETE_PAY_INITIALIZE', deletePayWorkerSaga)
}
