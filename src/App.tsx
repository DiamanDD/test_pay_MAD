import React from 'react'
import './App.css'
import { Layout } from './assets/Layout/Layout'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAuth } from './helpers/selectors'
import { Header } from './Components/Header/Header'
import { MyRoutes } from './Routes/MyRoutes'

const App = () => {
    // store
    const auth = useSelector(isAuth)
    // hooks

    if (!auth) <Navigate replace to="/login" />

    return (
        <Layout>
            <Header />
            <div className="myroutes">
                <MyRoutes />
            </div>
        </Layout>
    )
}

export default App
