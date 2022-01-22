import React from 'react'
import style from './Header.module.css'
import { authAction } from '../../features/f2-Autorization/f2-bll/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton } from '../CustomButton/CustomButtonType'
import { isAuth } from '../../features/f2-Autorization/f2-bll/selectors'
import { getIsLoading } from '../../utils/functions'
import CircularProgress from '@mui/material/CircularProgress'
import { getStatus } from '../../main/m1-bll/selectors'

export const Header = () => {
    // store
    const auth = useSelector(isAuth)
    const status = useSelector(getStatus)
    // hooks
    const dispatch = useDispatch()
    // functions
    const LogOut = () => {
        dispatch(authAction.getPays({ isAuth: false }))
    }
    return (
        <div className={style.nav}>
            {getIsLoading(status) && <CircularProgress />}
            {auth && (
                <CustomButton view={'edit'} title={'LogOut'} onClick={LogOut} />
            )}
        </div>
    )
}
