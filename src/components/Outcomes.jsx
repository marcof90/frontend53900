import React from 'react'
import auth from '../helpers/auth.helper'
import { Navigate } from 'react-router-dom'

export default function Outcomes({outcomes}) {
    return (
        auth.getToken() ?
        <div>
            <ol>
                {
                    outcomes.map(outcome=> <li key={outcome._id}>{outcome.value}</li>)
                }
            </ol>  
        </div>
        : <Navigate to={'/login'} />
    )
}
