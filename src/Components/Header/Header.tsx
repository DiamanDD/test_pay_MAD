import { CustomButton } from '../../assets/CustomButton/CustomButtonType'
import React from 'react'
import style from './Header.module.css'
import { authAction } from '../f2-Autorization/f2-bll/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { isAuth } from '../../helpers/selectors'

export const Header = () => {
    // store
    const auth = useSelector(isAuth)
    // hooks
    const dispatch = useDispatch()
    // functions
    const LogOut = () => {
        dispatch(authAction.getPays({ isAuth: false }))
    }
    return (
        <div className={style.nav}>
            {auth && (
                <CustomButton view={'edit'} title={'LogOut'} onClick={LogOut} />
            )}
        </div>
    )
}
