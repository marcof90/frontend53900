import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Incomes from '../../components/Incomes'
import auth from '../../helpers/auth.helper'
import Outcomes from '../../components/Outcomes'

export default function Account() {
    const [incomes, setIncomes] = useState([])
    const [outcomes, setOutcomes] = useState([])

    const value = useRef()
    const description = useRef()
    const type = useRef()

    useEffect(()=>{
        updateIncomes()
        updateOutcomes()
    }, [])

    const addRegister = function(){
        if(value.current.value === '' || description.current.value === '') return
        let url = null
        let income = false
        if(type.current.value === '1'){
            url = process.env.REACT_APP_API_URL+'incomes/'
            income = true
        }else if(type.current.value === '2'){
            url = process.env.REACT_APP_API_URL+'outcomes/'
        }else{
            alert('Debes seleccionar un tipo')
        }
        if(url){
            let form = new URLSearchParams()
            form.append('value', value.current.value)
            form.append('description', description.current.value)
            axios.post(url, form, { headers: {'x-auth-token':auth.getToken()}})
            .then(res=>{ 
                income ? updateIncomes() : updateOutcomes()
            })
            .catch(err => console.log(err))
            value.current.value = null
            description.current.value = null
            type.current.value = null
        }
    }

    const updateIncomes = function(){
        axios.get(process.env.REACT_APP_API_URL+'incomes/',{
            headers: {
                'x-auth-token': auth.getToken()
            }
        })
        .then(res => {
            // console.log(res.data[0])
            setIncomes(res.data)
        })
        .catch(err => console.log(err))
    }

    const updateOutcomes = function(){
        axios.get(process.env.REACT_APP_API_URL+'outcomes/',{
            headers: {
                'x-auth-token': auth.getToken()
            }
        })
        .then(res => {
            setOutcomes(res.data)
        })
        .catch(err => console.log(err))
    }

    return (
        auth.getToken() ?
        <div>
            <div>
                <h2>Agregar un registro</h2>
                <label htmlFor="value">Valor</label>
                <input ref={value} type="number" id="value" placeholder="valor" />
                <label htmlFor="desc">Descripción</label>
                <input ref={description} type="text" id="desc" placeholder="descripción del registro" />
                <label htmlFor="type">Tipo registro</label>
                <select ref={type} id="type">
                    <option value="null">Seleccione una opción</option>
                    <option value="1">Ingreso</option>
                    <option value="2">Egreso</option>
                </select>
                <button onClick={addRegister} >Agregar</button>
            </div>
            <div>
                <h2>Balance</h2>
                <h3>Total: </h3>
            </div>
            <div>
                <h2>Ingresos</h2>
                <Incomes incomes={incomes} />
            </div>
            <div>
                <h2>Egresos</h2>
                <Outcomes outcomes={outcomes} />
            </div>
        </div>
        : <Navigate to={'/'} />
    )
}
