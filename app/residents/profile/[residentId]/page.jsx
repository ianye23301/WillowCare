"use client"

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';
import Contacts from '@/components/Contacts';
import Assessment from '@/components/Assessment';



function ProfilePage({params}) {
  const [userInfo,setUserInfo] = useState(null)
  const  residentId  = params.residentId
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('personal')

  function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', options);
}


  const openService = (residentId) => {
    router.push(`/service/${residentId}`);
  };

  const openAssessment = (residentId) => {
    router.push(`/assessment/${residentId}`);
  };

  const openEditForm = (residentId) => {
    router.push(`/residents/form/${residentId}`);
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

      <div className="flex justify-center flex-col h-full p-5"> 
        <div className="input-text pb-5 mx-4">
            <a href="/residents" className="hover:underline">Residents</a>{` > ${userInfo.basic_info.name}`}
        </div>       
        <div className="bg-white rounded-lg w-full h-screen flex flex-row borders shadow-custom">
          <div className='flex flex-col w-1/4 p-4 pt-12 border-r px-6'>
            <div className='h-1/3'>
              <img
              src={userInfo.image}
              alt="Resident"
              className="w-full h-full rounded-lg"
              />
            </div>
            <div className='pt-4 flex flex-row items-center justify-center ml-3'>
            <h3 className='text-center'>{userInfo.basic_info.name}</h3>
            <button className='bg-gray-100 hover:bg-gray-400 flex items-center mx-3 justify-center text-white rounded-lg w-10' onClick={()=>{openEditForm(residentId)}}>
                <img src='/assets/icons/edit.svg' alt='Edit' className='w-6 h-6' />
            </button>
            </div>
            <div className='text-center input-text'>Resident</div>

            <div className='flex flex-col py-3'>

              <div className='flex flex-row py-1'>
                <div className='py-1 label-smaller w-2/5'>
                  Gender:
                </div>
                <div className='py-1 w-3/5 pl-3 body-text-smaller'>
                  {userInfo.basic_info.gender}
                </div>
              </div>
              <div className='flex flex-row py-1'>
                <div className='py-1 label-smaller w-2/5'>
                  DOB:
                </div>
                <div className='py-1 w-3/5 pl-3 body-text-smaller'>
                  {formatDate(userInfo.basic_info.birthday) + ` (${userInfo.basic_info.age})`}
                </div>
              </div>
              <div className='flex flex-row py-1'>
                <div className='py-1 label-smaller w-2/5'>
                  Room:
                </div>
                <div className='py-1 w-3/5 pl-3 body-text-smaller'>
                  {userInfo.basic_info.roomNumber}
                </div>
              </div>
              <div className='flex flex-row py-1'>
                <div className='py-1 label-smaller w-2/5'>
                  Telephone:
                </div>
                <div className='py-1 w-3/5 pl-3 body-text-smaller'>
                  {userInfo.basic_info.phoneNumber}
                </div>
              </div>

              

            </div>

            <div className='label-smaller'>
                  Quick Actions:
            </div>


            <div className='flex flex-grow flex-col bg-gray-50 overflow-y-auto rounded-lg borders shadow-custom m-3 p-2 mt-5'>
              <div className='borders bg-white rounded-md px-2 py-1 mt-1 small-bold input-text shadow-custom cursor-pointer hover:underline' onClick={()=>{openService(residentId)}}>
                Fill Service Plan
              </div>
              <div className='borders bg-white rounded-md px-2 py-1 mt-1 small-bold input-text shadow-custom cursor-pointer hover:underline' onClick={()=>{openAssessment(residentId)}}>
                View Assessment
              </div>
              <div className='borders bg-white rounded-md px-2 py-1 mt-1 small-bold input-text shadow-custom cursor-pointer hover:underline'>
                Print/View Face Sheet
              </div>
              <div className='borders bg-white rounded-md px-2 py-1 mt-1 small-bold input-text shadow-custom cursor-pointer hover:underline'>
                Add Daily Note
              </div>
            </div>




          </div>

            <div className='flex flex-col w-3/4'>
              <div className='border-b flex flex-row'>
                <div className= 'flex-grow py-2 text-center cursor-pointer hover:bg-gray-50'>
                  <div className={currentPage === 'personal' ? 'border-r py-1 gray-2-bold' : 'border-r py-1 gray-2' } onClick={() => setCurrentPage('personal')}>
                  Personal Details
                  </div>
                </div>
                <div className='flex-grow  py-2 text-center cursor-pointer hover:bg-gray-50'>
                  <div className={currentPage === 'contacts' ? 'border-r py-1 gray-2-bold' : 'border-r py-1 gray-2' } onClick={() => setCurrentPage('contacts')}>
                  Contacts
                  </div>
                </div>
                <div className='flex-grow  py-2 text-center cursor-pointer hover:bg-gray-50'>
                  <div className={currentPage === 'assessment' ? 'border-r py-1 gray-2-bold' : 'border-r py-1 gray-2' } onClick={() => setCurrentPage('assessment')}>
                  Assessment
                  </div>
                </div>
                <div className='flex-grow  py-2 text-center cursor-pointer hover:bg-gray-50'>
                  <div className={currentPage === 'health' ? 'border-r py-1 gray-2-bold' : 'border-r py-1 gray-2' } onClick={() => setCurrentPage('health')}>
                  Health
                  </div>
                </div>
                <div className='flex-grow  py-2 text-center cursor-pointer hover:bg-gray-50'>
                  <div className={currentPage === 'insurance' ? 'border-r py-1 gray-2-bold' : 'border-r py-1 gray-2' } onClick={() => setCurrentPage('insurance')}>
                  Insurance
                  </div>
                </div>
                <div className='flex-grow  py-2 text-center cursor-pointer hover:bg-gray-50'>
                  <div className={currentPage === 'finances' ? 'border-r py-1 gray-2-bold' : 'border-r py-1 gray-2' } onClick={() => setCurrentPage('finances')}>
                  Finances
                  </div>
                </div>
                <div className='flex-grow  py-2 text-center cursor-pointer hover:bg-gray-50'>
                  <div className={currentPage === 'forms' ? 'py-1 gray-2-bold' : ' py-1 gray-2' } onClick={() => setCurrentPage('forms')}>
                  Forms
                  </div>
                </div>
              </div>

              <div className='flex flex-grow overflow-y-auto bg-gray-50'>
                {currentPage === 'personal' && 
                <Profile param = {userInfo}/>
                }
                {currentPage === 'contacts' && 
                <Contacts param = {residentId}/>
                }
                {currentPage === 'assessment' && 
                <Assessment params = {residentId}/>
                }


              
              </div>



            </div>



            
        </div>

        
      </div>
      :
      <div className="flex justify-center mt-10 h-screen overflow-y-auto">
        <div className="bg-white m-8 rounded-lg w-full h-screen">
          
        </div>
      </div>

    )
    
  )
}

export default ProfilePage