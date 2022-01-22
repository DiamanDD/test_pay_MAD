import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPayList } from '../f1-bll/pays-reducer'
import style from './Pays.module.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { PayType } from '../f1-bll/payTypes'
import { getPays } from '../f1-bll/selectors'
import { isAuth } from '../../f2-Autorization/f2-bll/selectors'

export const Pays = () => {
    // store
    const pays = useSelector(getPays)
    const auth = useSelector(isAuth)
    // hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // function
    const onClick = (payment: PayType) => {
        // dispatch(paysAction.getPay(payment))
        navigate('/pay/' + payment.id)
    }

    useEffect(() => {
        dispatch(getPayList())
    }, [dispatch])

    if (!auth) return <Navigate replace to="/login" />
    return (
        <ul className={style.container}>
            {pays.map((payment) => {
                return (
                    <li
                        key={payment.id}
                        className={style.pay}
                        onClick={() => onClick(payment)}>
                        <div>{payment.name}</div>
                        <div>{payment.sum}</div>
                    </li>
                )
            })}
        </ul>
    )
}
