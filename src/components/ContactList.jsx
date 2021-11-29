import React from 'react'
import Contact from './Contact'
import './styles/contact.css'

function ContactList({contacts, checkContact}){
    return (
        <ul className="contact-list">
            {contacts.map(contact=>
                <Contact contact={contact} key={contact.id} 
                checkContact={checkContact}/>
            )}
        </ul>
    )
}

export default ContactList