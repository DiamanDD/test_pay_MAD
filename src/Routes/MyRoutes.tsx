import { Route, Routes } from 'react-router-dom'
import { Login } from '../Components/f2-Autorization/f2-ui/Login'
import { Pays } from '../Components/f1-Pays/f1-ui/Pays'
import { Pay } from '../Components/f3-Pay/f3-ui/Pay'
import React from 'react'

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Login />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/pays'} element={<Pays />} />
            <Route path={'/pay'} element={<Pay />} />
        </Routes>
    )
}
