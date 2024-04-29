"use client"
import { useState } from "react";


const Overlay = ({id, onClose, onSubmit, name, setName, date, setDate, contact, setContact, showPortal, setShowPortal}) => {
    const handleDone = (e) => {
        console.log(name)
        onSubmit({ name: name, date: date, id: id, contact: contact});
        onClose()
    }

    const handleSubmit = (e) => {
        console.log(name)
        setShowPortal(true)
    };

    const [copied, setCopied] = useState(false);
    const linkToCopy = `${window.location.origin}/invite/${id}`; // Replace 'your-relative-path' with the path you want to copy

    const handleCopy = async () => {
        console.log(name)
        try {
          console.log(linkToCopy)
          await navigator.clipboard.writeText(linkToCopy);
          onSubmit({ name: name, date: date, id: id, contact: contact});
          setCopied(true);
          setTimeout(() => setCopied(false), 5000); 
        } catch (error) {
          console.error('Failed to copy:', error);
        }
      };
    

    return (
        //fix all the relative spacing at some point
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            {showPortal ? (
                <div className="background w-1/4 rounded-lg borders shadow-custom flex flex-col">
                <div className='flex mx-5 my-4'>
                    <h2 className='w-5/6'>
                        Add Prospect 
                    </h2>
                    <div className='w-1/6 flex justify-end'>
                        <img
                            src="/assets/icons/close gray.svg"
                            alt="Close"
                            className='mx-1 w-7 h-7 cursor-pointer '
                            onClick={onClose}
                        /> 
                    </div>
                </div>
                    <div className='bg-white border-y shadow-custom flex flex-col'>
                        <div className='body-text m-5'>
                            Share the link below with families to enroll at your center. You can directly share the link, embed it as a button on your website, or print a QR code for families to scan.
                        </div>
                        <div className='gray-12-bg px-3 py-2 m-3 mx-6 rounded-lg borders shadow-custom link-text input-text'>
                            <div className='cursor-pointer' onClick={handleCopy}>{linkToCopy}</div>
                        </div>
                        <div className='m-3 my-4 label link-text flex flex-row cursor-pointer' onClick={handleCopy}>
                            <img src='/assets/icons/copy.svg'
                            alt = 'Copy'
                            className='mx-2'
                            />
                            Copy Link
                        </div>
                    </div>
                    <div className='flex justify-end m-3 content-center	'>
                        <button className='close_button px-3 py-1' onClick={()=>{setShowPortal(false)}}>Cancel</button>
                        <button className='px-3 py-1 ml-5' onClick={handleDone}>Done</button>
                    </div>
                    {copied && 
                        <div className='copied-notification fade-out'>Copied!</div>
                    }
                        
            </div>
                
            ):(
                <div className="background w-2/6 rounded-lg borders shadow-custom flex flex-col h-4/6">
                <form onSubmit={handleSubmit}>

                    <div className='flex mx-5 my-4'>
                        <h2 className='w-5/6'>
                            Add Prospect 
                        </h2>
                        <div className='w-1/6 flex justify-end'>
                            <img
                                src="/assets/icons/close gray.svg"
                                alt="assessment icon"
                                className='mx-1 w-7 h-7 cursor-pointer '
                                onClick={onClose}
                            />
                        </div>
                    </div>

                    <div className='bg-white border-y shadow-custom flex flex-col'>

                        <div className='px-4 py-4'>
                            <div className='flex flex-col pb-6 border-b'>
                                <div className='flex flex-col'>
                                    <label className='label'>Name <span className='text-red-500'>*</span></label>
                                    <input 
                                        className='borders rounded-lg shadow-custom p-2 px-3 mt-2 input-text' 
                                        placeholder='John Smith'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required>
                                    </input>
                                </div>
                                <div className='flex flex-col mt-5'>
                                    <label className='label'>Target Due Date </label>
                                    <input 
                                        type='date' 
                                        className='borders rounded-lg shadow-custom p-2 px-3 mt-2 input-text'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col px-4 pb-4'>
                            <div className='flex flex-col'>
                                <label className='label'>Primary Contact <span className='text-red-500'>*</span></label>
                                <input 
                                    className='borders rounded-lg shadow-custom p-2 px-3 mt-2 input-text' 
                                    placeholder='Jane Smith'
                                    value={contact.name}
                                    onChange={(e) => setContact({
                                        ...contact,
                                        name: e.target.value
                                      })}
                                      required>
                                </input>
                            </div>
                            <div className='flex flex-row'>
                                <div className='flex flex-col mt-5 w-1/2 pr-2'>
                                    <label className='label'>Phone <span className='text-red-500'>*</span></label>
                                    <input 
                                        className='borders rounded-lg shadow-custom p-2 px-3 mt-2 input-text' 
                                        placeholder='(XXX) XXX - XXX'
                                        value={contact.phone}
                                        onChange={(e) => setContact({
                                            ...contact,
                                            phone: e.target.value
                                        })}
                                        required>
                                    </input>
                                </div>
                                <div className='flex flex-col mt-5 w-1/2 pl-2'>
                                    <label className='label'>Email <span className='text-red-500'>*</span></label>
                                    <input 
                                        className='borders rounded-lg shadow-custom p-2 px-3 mt-2 input-text' 
                                        placeholder='Jane@email.com'
                                        value={contact.email}
                                        onChange={(e) => setContact({
                                            ...contact,
                                            email: e.target.value
                                        })}
                                        required>
                                        </input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end m-3 mr-6'>
                        <button className='close_button px-3 py-1' onClick={onClose}>Cancel</button>
                        <button type = 'submit' className='px-3 py-1 ml-5 button' >Next</button>
                    </div>
                </form>
                    
            </div>
            )
            }
            
        </div>
       
    )

}


export default Overlay