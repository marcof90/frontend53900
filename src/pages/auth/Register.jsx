import React, {useRef} from 'react'
import axios from 'axios'
import auth from '../../helpers/auth.helper'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const name = useRef()
    const email = useRef()
    const pass = useRef()

    const signUp = async ()=>{
        const nameF = name.current.value
        const emailF = email.current.value
        const passF = pass.current.value
        if(nameF === '' || emailF === '' || passF ==='') return
        let form = new URLSearchParams()
        form.append('name', nameF)
        form.append('email', emailF)
        form.append('password', passF)
        const response = await axios.post(process.env.REACT_APP_API_URL+'auth/register',
            form, { headers: {'Accept':'application/json'}}
        )
        console.log(response)
        auth.setToken(response.data.token)
        navigate('/')
    }

    return (
        !auth.getToken() ?
        <div>
            <h2>Registro</h2>
            <label htmlFor="name">Nombre</label>
            <input ref={name} type="text" id="name" placeholder="Nombre"/>
            <label htmlFor="email">E-mail</label>
            <input ref={email} type="email" id="email" placeholder="example@email.com" />
            <label htmlFor="pass">Contraseña</label>
            <input ref={pass} type="password" id="pass" placeholder="******" />
            <button onClick={signUp}>Registrarme</button>
        </div>: <Navigate to={'/'} />
    )
}
