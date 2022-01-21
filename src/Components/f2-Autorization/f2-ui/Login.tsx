import { CircularProgress } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton } from '../../../assets/CustomButton/CustomButtonType'
import { CustomInput } from '../../../assets/CustomInput/CastomInput'
import { getStatus, isAuth } from '../../../helpers/selectors'
import style from './Login.module.css'
import { getIsLoading } from '../../../helpers/functions'
import { authorizeAction } from '../f2-bll/auth-reducer'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    // store
    const status = useSelector(getStatus)
    const auth = useSelector(isAuth)

    // hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState<string>('')
    const [error, setError] = useState<string | null>('')
    const [password, setPassword] = useState<string>('')

    const onChangeLogin = useCallback(
        (result: string) => {
            setLogin(result)
        },
        [setLogin]
    )
    const onChangePassword = useCallback(
        (result: string) => {
            setPassword(result)
        },
        [setPassword]
    )
    const onClick = () => {
        if (login && password) {
            setError('')
            dispatch(authorizeAction(login, password))
        } else {
            setError('Поле логин  и пароль должны быть заполненны')
        }
    }

    useEffect(() => {
        if (auth) {
            navigate('/pays')
        }
    }, [auth])

    return (
        <div className={style.login}>
            <div className={style.progress}>
                {getIsLoading(status) && <CircularProgress />}
            </div>
            <div className={style.learnTo}>MAD PAY</div>
            <div className={style.singIn}>Sing In</div>
            <div className={style.blockInput}>
                <CustomInput
                    label="Login"
                    result={onChangeLogin}
                    placeholder={'Guest'}
                />
                <CustomInput
                    label="Password"
                    type="password"
                    placeholder={'Guest123245@'}
                    result={onChangePassword}
                    error={error}
                />
            </div>
            <div className={style.button}>
                <CustomButton
                    onClick={onClick}
                    title="Login"
                    view="primary"
                    disabled={getIsLoading(status)}
                />
            </div>
        </div>
    )
}
