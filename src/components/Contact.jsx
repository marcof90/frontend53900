import React from 'react'
import './styles/contact.css'

export default function Contact({contact, checkContact}) {
    const {id, name, isSelected} = contact

    const checkFunction = ()=>{
        checkContact(id)
    }

    return (
        <li className="contact">
        <input type="checkbox" checked={isSelected} onChange={checkFunction}/>
        {name}
        </li>
    )
}
