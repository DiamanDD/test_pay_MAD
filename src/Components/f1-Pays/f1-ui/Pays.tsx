import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPAys, isAuth } from '../../../helpers/selectors'
import { gepPayList, paysAction, PayType } from '../f1-bll/pays-reducer'
import style from './Pays.module.css'
import { Navigate, useNavigate } from 'react-router-dom'

export const Pays = () => {
    // store
    const pays = useSelector(getPAys)
    const auth = useSelector(isAuth)
    // hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // function
    const onClick = (el: PayType) => {
        dispatch(paysAction.getPay(el))
        navigate('/pay')
    }

    useEffect(() => {
        dispatch(gepPayList())
    }, [])

    if (!auth) return <Navigate replace to="/login" />
    return (
        <div>
            <ul className={style.container}>
                {pays.map((el) => {
                    return (
                        <li
                            key={el.id}
                            className={style.pay}
                            onClick={() => onClick(el)}>
                            <div>{el.name}</div>
                            <div>{el.sum}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
