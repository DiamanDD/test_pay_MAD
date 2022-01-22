import React, { ChangeEvent, useCallback, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import style from './Pay.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
    deletePay,
    getPayment,
    updatePay,
} from '../../f1-PaymentList/f1-bll/pays-reducer'
import { CustomSpan } from './CustomSpan'
import { CustomButton } from '../../../common/CustomButton/CustomButtonType'
import { usePayState } from '../../../utils/usePayState'
import { PayType } from '../../f1-PaymentList/f1-bll/payTypes'
import {
    deleteStatus,
    getStatePay,
} from '../../f1-PaymentList/f1-bll/selectors'
import { isAuth } from '../../f2-Autorization/f2-bll/selectors'
import logo from '../../../assets/logo.png'

export const Pay = () => {
    // store
    const state = useSelector(getStatePay)
    const auth = useSelector(isAuth)
    const isPayDelete = useSelector(deleteStatus)
    // hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { paymentId } = useParams()

    //state
    const {
        setSpanCityName,
        setSpanName,
        stateSpanCityName,
        stateSpanSum,
        setSpanSum,
        stateSpanName,
        userCityName,
        setUserName,
        userName,
        setSum,
        setCityName,
        userSum,
    } = usePayState(state.sum, state.city_name, state.name)

    // function
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    const onChangeCityName = (e: ChangeEvent<HTMLInputElement>) => {
        setCityName(e.currentTarget.value)
    }
    const onChangeSum = (e: ChangeEvent<HTMLInputElement>) => {
        setSum(e.currentTarget.value)
    }
    const closePay = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const onBlurSpan = (onblur: (payload: true) => void) => {
        onblur(true)
        setNewInfo()
    }

    const setNewInfo = () => {
        const model: PayType = {
            createdAt: state.createdAt,
            name: userName,
            avatar: state.avatar,
            sum: userSum,
            city_name: userCityName,
            id: state.id,
        }
        dispatch(updatePay(state.id, model))
    }
    const deleteCardPay = () => {
        let isDelete = window.confirm('Вы Уверенны что хотите удалить платеж? ')
        isDelete && dispatch(deletePay(state.id))
    }
    useEffect(() => {
        if (isPayDelete) closePay()
    }, [isPayDelete, closePay])

    useEffect(() => {
        paymentId && dispatch(getPayment(paymentId))
    }, [dispatch, paymentId])

    useEffect(() => {
        setUserName(state.name)
        setCityName(state.city_name)
        setSum(state.sum)
    }, [
        state.sum,
        state.city_name,
        state.name,
        setUserName,
        setCityName,
        setSum,
    ])

    if (!auth) return <Navigate replace to="/login" />
    return (
        <div className={style.container}>
            <div className={style.close} onClick={closePay}>
                x
            </div>
            <div>
                {/*<img src={state.avatar} alt="log" />*/}
                <img
                    src={state.avatar && logo}
                    alt="log"
                    className={style.logo}
                />
            </div>
            <div className={style.spanContainer}>
                <CustomSpan
                    title="user name"
                    status={stateSpanName}
                    setSpan={setSpanName}
                    state={state.name}
                    onBlur={() => onBlurSpan(() => setSpanName(true))}
                    changeState={onChangeName}
                    newState={userName}
                />
            </div>
            <div className={style.spanContainer}>
                <CustomSpan
                    title="user city"
                    status={stateSpanCityName}
                    setSpan={setSpanCityName}
                    state={state.city_name}
                    onBlur={() => onBlurSpan(() => setSpanCityName(true))}
                    changeState={onChangeCityName}
                    newState={userCityName}
                />
            </div>
            <div className={style.spanContainer}>
                <CustomSpan
                    title="user sum"
                    status={stateSpanSum}
                    setSpan={setSpanSum}
                    state={state.sum}
                    onBlur={() => onBlurSpan(() => setSpanSum(true))}
                    changeState={onChangeSum}
                    newState={userSum}
                />
            </div>
            <span className={style.descr}>
                * Для изменений кликните два раза на нужное поле
            </span>
            <CustomButton
                title={'delete'}
                view={'delete'}
                onClick={deleteCardPay}
            />
        </div>
    )
}
