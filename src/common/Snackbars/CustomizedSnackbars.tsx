import * as React from 'react'
import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import style from './CustomizedSnackbars.module.css'
import { Alert } from './Alert'
import { getApiError } from '../../main/m1-bll/selectors'
import { appAction } from '../../main/m1-bll/app-reducer'

export function CustomizedSnackbars() {
    // state
    const [open, setOpen] = useState<boolean>(false)

    // store
    const error = useSelector(getApiError)

    const dispatch = useDispatch()

    // func
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        setTimeout(() => {
            dispatch(appAction.setErrorAC(''))
        }, 500)
    }

    // hooks
    useEffect(() => {
        error && setOpen(true)
    }, [error])

    return (
        <Stack spacing={2} sx={{ width: '100%' }} className={style.error}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    )
}
