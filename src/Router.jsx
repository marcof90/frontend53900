import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContactApp from './components/ContactApp'
import App from './App'
import NotFound from './pages/NotFound'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Account from './pages/account/Account'

export default function Router() {
    return (
        <Routes>
            <Route path={'/'} element={<ContactApp />} />
            <Route path={'/home'} element={<App />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/app'} element={<Account />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
