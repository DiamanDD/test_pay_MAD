import React, { ChangeEvent, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import style from './Pay.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {deletePay, PayType, updatePay} from '../../f1-Pays/f1-bll/pays-reducer'
import {deleteStatus, isAuth, statePay} from '../../../helpers/selectors'
import { CustomSpan } from './CustomSpan'
import { usePayState } from '../../../helpers/usePayState'
import {CustomButton} from "../../../assets/CustomButton/CustomButtonType";

export const Pay = () => {
    // store
    const state = useSelector(statePay)
    const auth = useSelector(isAuth)
    const isPayDelete = useSelector(deleteStatus)
    // hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
    const closePay = () => {
        navigate(-1)
    }
    const onBlurSpanName = () => {
        setSpanName(true)
        setNewInfo()
    }
    const onBlurSpanCityName = () => {
        setSpanCityName(true)
        setNewInfo()
    }
    const onBlurSpanSum = () => {
        setSpanSum(true)
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
    const deleteCardPay=()=>{
        dispatch(deletePay(state.id))
    }
    useEffect(() => {}, [state.name, state.sum, state.city_name])

    useEffect(()=>{
        if(isPayDelete)closePay()
    },[isPayDelete])
    if (!auth) return <Navigate replace to="/login" />
    return (
        <div className={style.container}>
            <div className={style.close} onClick={closePay}>
                x
            </div>
            <div>
                <img src={state.avatar} alt="logo" />
            </div>
            <CustomSpan
                title="user name"
                status={stateSpanName}
                setSpan={setSpanName}
                state={state.name}
                onBlur={onBlurSpanName}
                changeState={onChangeName}
                newState={userName}
            />
            <CustomSpan
                title="user city"
                status={stateSpanCityName}
                setSpan={setSpanCityName}
                state={state.city_name}
                onBlur={onBlurSpanCityName}
                changeState={onChangeCityName}
                newState={userCityName}
            />
            <CustomSpan
                title="user sum"
                status={stateSpanSum}
                setSpan={setSpanSum}
                state={state.sum}
                onBlur={onBlurSpanSum}
                changeState={onChangeSum}
                newState={userSum}
            />
            <span className={style.descr}>
                * Для изменений кликните два раза на нужное поле
            </span>
            <CustomButton title={"delete"} view={"delete"} onClick={deleteCardPay}/>
        </div>
    )
}
