"use client"
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import Overlay from '@/components/Overlay';

const page = () => {
    const [showOverlay, setShowOverlay] = useState(false)
    const [showPortal, setShowPortal] = useState(false)
    const [id, setId] = useState('')
    const [name,setName] = useState('')
    const [date,setDate] = useState('')
    const [contact,setContact] = useState({
        name: '',
        phone: '',
        email: '',
    })
    const { data: session, status } = useSession();

    const [residents, setResidents] = useState(null)


    function formatDate(inputDate) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', options);
    }

    const handleAddProspect = () => {
        const new_id = uuidv4()
        setId(new_id)
        setShowOverlay(true)
    }

    const closeAddProspect = () => {
        setShowPortal(false)
        setShowOverlay(false)
        setName('')
        setDate('')
        setContact({...contact,
        name: '',
        phone: '',
        email: '',
        })
    }

    const fetchResidents = async() => {
        console.log(session?.user.email)
        try {
            const response = await fetch('/api/move_ins/fetch', {
                method: 'POST',
                body: JSON.stringify({
                    user_email: session?.user.email
                })
              });
            const data = await response.json()
            setResidents(data)
            console.log(residents)
        }
        catch (error) {
             console.error(error)
        }

    }

    const handleProspectSubmit = async({id, name, date, contact}) => {
        try {
            const response = await fetch('/api/move_ins/new', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id: id,
                  name: name,
                  date: date,
                  contact: contact,
                  user_email: session?.user.email
                })
              });
              fetchResidents()
        }
        catch (error) {
             console.error(error)
        }
    }
    
    useEffect(()=> {
        fetchResidents()
    },[session])

  return (
    <div className='h-screen overflow-y-auto flex flex-col'>
        <div className='flex flex-col h-full w-5/6 items-center mx-auto'>
            <div className='flex justify-end w-full py-10'>
                <button className='button p-2 px-4 ' onClick={handleAddProspect}>Add Prospect</button>
            </div>
            <div className='w-full min-h-40 px-4 bg-white rounded borders shadow-custom'>
                <div className='gray-12-bg borders shadow-custom mx-4 my-4 flex flex-row' onClick={()=>{console.log(residents)}}>
                    <div className='w-1/6 label p-2'> Name </div>
                    <div className='w-1/5 label p-2'> Target Date </div>
                    <div className='w-1/4 label p-2'> Progress </div>
                    <div className='w-1/5 label p-2'> Last Update</div>
                    <div className='w-1/6 label p-2'> Contact</div>
                </div>
                {residents ? (
                    
                    residents.map((resident, index) => (
                        <div key={index} className='mx-4 my-4 flex flex-row h-20'>
                            <div className='w-1/6 p-2 label'> {resident.name} </div>
                            <div className='w-1/5 p-2 label'> {formatDate(resident.target_date)} </div>
                            <div className='w-1/4 p-2 label'> Progress </div>
                            <div className='w-1/5 p-2 label'> Last Update</div>
                            <div className='w-1/6 p-2 flex flex-col'> 
                                <div className='label'>{resident.contact.name}</div>
                                <div className='input-text gray-3'>
                                    {resident.contact.phone} - {resident.contact.email}
                                </div>
                            </div>
                        </div>
                    ))


                ) : (
                    <div>
                        
                    </div>
                )}
                                
                
            </div>
        </div>



                
            

        {showOverlay && (
            <Overlay 
                id={id} 
                name={name} 
                setName = {setName} 
                date={date} 
                setDate={setDate} 
                contact={contact} 
                setContact={setContact} 
                onClose={closeAddProspect} 
                onSubmit={handleProspectSubmit} 
                showPortal = {showPortal}
                setShowPortal = {setShowPortal}/>
        )}
         
    </div>
  )
}

export default page
