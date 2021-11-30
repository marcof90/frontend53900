import React from 'react'
import auth from '../helpers/auth.helper'
import { Navigate } from 'react-router-dom'

export default function Incomes({incomes}) {
    return (
        auth.getToken() ?
        <div>
            <ol>
                {
                    incomes.map( income => <li key={income._id}>{income.value}</li> )   
                }
            </ol>
        </div>
        : <Navigate to={'/login'} />
    )
}
