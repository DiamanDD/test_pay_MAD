import { Route, Routes } from 'react-router-dom'
import { Login } from '../../features/f2-Autorization/f2-ui/Login'
import { Pays } from '../../features/f1-PaymentList/f1-ui/Pays'
import { Pay } from '../../features/f3-Payment/f3-ui/Pay'
import React from 'react'

export const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Login />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/pays'} element={<Pays />} />
                <Route path={'/pay'}>
                    <Route path={':paymentId'} element={<Pay />} />
                </Route>
            </Routes>
        </>
    )
}
