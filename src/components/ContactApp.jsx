import React, {useState, Fragment, useRef, useEffect} from 'react'
import ContactList from './ContactList'
import { v4 as uuid } from 'uuid'
import auth from '../helpers/auth.helper'
import { Navigate } from 'react-router-dom'

export default function ContactApp() {
    const [contacts, setContacts] = useState([])

    const nameref = useRef()

    useEffect(()=>{
        const storedContacts = JSON.parse(localStorage.getItem('contacts'))
        if(storedContacts){
            setContacts(storedContacts)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])

    const addContact = ()=>{
        const name = nameref.current.value
        if(name === '') return
        setContacts((prevContacts)=>{
            return [...prevContacts, {id: uuid(), name, isSelected: false}]
        })
        console.log(contacts)
        nameref.current.value = null
    }

    const checkContact = (id)=>{
        const newContacts = [...contacts]
        const contact = newContacts.find( contact => contact.id === id )
        contact.isSelected = !contact.isSelected
        setContacts(newContacts)
    }

    const deleteContact = ()=>{
        const selectedContacts = contacts.filter(contact => !contact.isSelected)
        setContacts(selectedContacts)
    }

    return (
        auth.getToken() ?
        <Fragment>
        <ContactList contacts={contacts} checkContact={checkContact}/>
        <input ref={nameref} type="text" placeholder="Agregar Contacto" />
        <button onClick={addContact}>🙋‍♀️</button>
        <button onClick={deleteContact}>🙅‍♀️</button>
        <div>
            💁‍♀️ {contacts.filter(contact => contact.isSelected).length}  
            contactos seleccionados
        </div>
        </Fragment>
        : <Navigate to={'/login'} />
    )
}

// export default ContactApp