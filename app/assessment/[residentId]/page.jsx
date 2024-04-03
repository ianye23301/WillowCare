"use client"
import React, { useEffect } from 'react'

const Assessment = ({params}) => {
    const {residentId} = params

    useEffect (() => {
        console.log(params)
    })
  return (
    <div className='flex'>
        <div className='w-2/3 '>
            <div className="h-screen overflow-y-auto px-5 py-5">
                {residentId}
            </div>
        </div>
    </div>

  )
}

export default Assessment
