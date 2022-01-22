import React from 'react'
import './App.css'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Header } from '../../common/Header/Header'
import { MyRoutes } from '../../common/Routes/MyRoutes'
import { Layout } from '../../common/Layout/Layout'
import { isAuth } from '../../features/f2-Autorization/f2-bll/selectors'
import { CustomizedSnackbars } from '../../common/Snackbars/CustomizedSnackbars'
import CircularProgress from '@mui/material/CircularProgress'
import { getStatus } from '../m1-bll/selectors'
import { getIsLoading } from '../../utils/functions'

const App = () => {
    // store
    const auth = useSelector(isAuth)
    const status = useSelector(getStatus)

    if (!auth) <Navigate replace to="/login" />

    return (
        <Layout>
            {getIsLoading(status) && <CircularProgress color={'warning'} />}
            <CustomizedSnackbars />
            <Header />
            <div className="myroutes">
                <MyRoutes />
            </div>
        </Layout>
    )
}

export default App
