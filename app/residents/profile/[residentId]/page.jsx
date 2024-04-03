"use client"

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



function ProfilePage({params}) {
  const [userInfo,setUserInfo] = useState(null)
  const  residentId  = params.residentId
  const { data: session, status } = useSession();
  const router = useRouter();


  const openService = (residentId) => {
    router.push(`/service/${residentId}`);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/residents/fetch_single', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: residentId
          })
        });
        const data = await response.json();
        setUserInfo(data[0])
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    (userInfo !== null ? 
      <div className="flex justify-center mt-10 h-screen overflow-y-auto">
        <div className="bg-white p-8 rounded-lg w-3/4 h-1/3 flex flex-col">
          <h2 className="font-bold mb-4">{userInfo.name}</h2>
          <button onClick={() => openService(residentId)} className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
                        View/Edit Service Plan
          </button>
        </div>
      </div>
      :
      <div className="flex justify-center mt-10 h-screen overflow-y-auto">
        <div className="bg-white p-8 rounded-lg w-3/4 h-1/3 flex flex-col">
          
        </div>
      </div>

    )
    
  )
}

export default ProfilePage