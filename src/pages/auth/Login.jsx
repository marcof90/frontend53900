import React, {Fragment, useRef} from 'react'
import axios from 'axios'
import auth from '../../helpers/auth.helper'
import { useNavigate, Navigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const email = useRef()
    const pass = useRef()

    const signIn = async ()=>{
        let form = new URLSearchParams()
        if(email.current.value === '' || pass.current.value === '' ) return
        form.append('email', email.current.value)
        form.append('password', pass.current.value)
        // console.log(process.env.REACT_APP_API_URL)
        const response = await axios.post(process.env.REACT_APP_API_URL+
            'auth/login', form, { headers: {'Accept':'application/json'}})
        // console.log(response)
        auth.setToken(response.data.token)
        navigate('/')
    }

    return (
        !auth.getToken() ?
        <Fragment>
            <div>
                <h2>Inicio de Sesión</h2>
                <label htmlFor="email">Email</label>
                <input ref={email} type="email" id="email" placeholder="example@email.com" />
                <label htmlFor="pass">Contraseña</label>
                <input ref={pass} type="password" id="pass" placeholder="*****"/>
                <button onClick={signIn}>Ingresar</button>
            </div>
        </Fragment>: <Navigate to={'/'} />
    )
}
