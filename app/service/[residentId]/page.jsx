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
    (userInfo !== null && 
      <div className="flex justify-center items-start mt-10 h-screen">
        <div className="bg-white p-8 rounded-lg w-3/4 h-1/3 flex flex-col">
          <h2 className="font-bold mb-4">Service Plan For: {userInfo.name}</h2>
        </div>
      </div>
    )
    
  )
}

export default ProfilePage