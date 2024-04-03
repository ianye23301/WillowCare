"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
);

const Form = () => {

  const [loading, setLoading] = useState(true); // State for loading indicator
  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [careLevel, setCareLevel] = useState(1);
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('Male');
  const [pic, setPic] =  useState({})


  const { data: session, status } = useSession();
  const [userResidents, setUserResidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();


  const fetchUserResidents = async () => {
    setLoading(true); // Set loading state to true when fetching data
    try {
      const response = await fetch('/api/residents/fetch', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_email: session?.user.email
        })
      });
      const data = await response.json();
      setUserResidents(data);
      console.log(data)
      setLoading(false); // Set loading state to false when data fetching is complete

    } catch (error) {
      console.error('Error fetching regulations data:', error);
      setLoading(false); // Set loading state to false when data fetching is complete

    }
  };


  useEffect(() => {
    if (status === 'loading') return; // Don't redirect while session is loading
    fetchUserResidents();
  }, [status, session, router]);

  useEffect(() => {
    if (status === 'loading') return; // Don't redirect while session is loading
    if (!session) {
      router.push('/api/auth/signin')};
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (name === ""){
    return
  }
    const currentDate = new Date().toISOString().split('T')[0];
    const formData = new FormData()
    formData.append('name', name)
    formData.append('roomNumber', roomNumber)
    formData.append('careLevel', careLevel)
    formData.append('birthday', birthday)
    formData.append('gender', gender)
    formData.append('date', currentDate)
    formData.append('user_email', session?.user.email)
    formData.append('responsible', session?.user.name)
    formData.append('file', pic)


    try {
      console.log(formData)
      const response = await fetch('/api/residents/new', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setName('');
        setRoomNumber('');
        setCareLevel('');
        setBirthday('')
        setGender('')
        setShowForm(false);
        setPic({})
        fetchUserResidents();
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleDelete = async (residentId) => {
    try {
      const response = await fetch(`/api/residents/delete`, {
        method: 'POST',
        body: JSON.stringify({
          residentId: residentId
        })
      });
      if (response.ok) {
        console.log('User deleted successfully');
        fetchUserResidents();
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setPic(file);
  };



  const openProfile = (residentId) => {
    router.push(`/residents/profile/${residentId}`);
  };

  const openService = (residentId) => {
    router.push(`/service/${residentId}`);
  };

  const openPlan = (residentId) => {
    router.push(`/assessment/${residentId}`);
  };


  return (
      !showForm ? (

      loading ? (
        <LoadingIndicator/>
      ) : (
        <div className="flex flex-col items-center h-screen overflow-y-auto">
  <div className="w-full"> 
    <div className="px-5 py-5">
      <table className="w-full py-4 rounded-md bg-white shadow-custom">
        <thead className="label gray-9-bg">
          <tr>
            <th className='p-1'></th>
            <th className="p-1 text-left">Name</th>
            <th className="p-1 text-left">Room Number</th>
            {/* <th className="p-1 text-left">Care Level</th> */}
            <th className="p-1 text-left">Admitted</th>
            <th className="p-1 text-left">Mobility</th>
            <th className="p-1 text-left">Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {userResidents.map((resident, index) => (
            <tr key={index}>
              <td>
                  {resident.image && <img src={resident.image} alt="Resident" className='w-12 h-12 object-contain p-1'/>}
              </td>              
              <td onClick={() => openProfile(resident.id)} className="p-1 cursor-pointer link-text hover:underline">{resident.name}</td>
              <td className='p-1'>{resident.room}</td>
              {/* <td className='p-1'>{resident.care_level}</td> */}
              <td className='p-1'>{resident.date}</td>
              <td className='p-1'>
                <ul>
                  {resident.tasks.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task.rn}</li>
                  ))}
                </ul>
              </td>
              <td className='p-1'>
              <button onClick={() => openPlan(resident.id)} className=" text-white py-1 px-2 rounded button focus:outline-none focus:ring-2 mr-2">
                <img src="/assets/icons/assessment.svg" alt="assessment icon" className="w-6 h-6" />
            </button>
              <button onClick={() => openService(resident.id)} className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 mr-2">
                       <img src = "/assets/icons/plan copy.svg" alt = "service icon" className="w-6 h-6"/>
                    </button>
                <button onClick={() => handleDelete(resident.id)} className="bg-red-700 text-white py-1 px-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 mr-2">
                      <img src = "/assets/icons/delete.svg" alt="Delete Icon" className="w-6 h-6"/>
                    </button>
                    
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      type="button"
      onClick={() => setShowForm(true)}
      className="button text-white py-2 px-4 rounded  focus:outline-none focus:ring-2 block mx-auto mt-4"
    >
      {userResidents.length > 0 ? 'Add Another Resident' : 'Add a Resident'}
    </button>
  </div>
</div>

      )
      
      ) : 
        <div className='h-screen'>
        <h2 className="text-2xl font-bold mb-4 text-center mt-10">Enter Resident Details</h2>

        <div className="flex items-center justify-center max-h-screen">
                
  <form onSubmit={handleSubmit} className="flex flex-col w-4/5">
    <label htmlFor="name" className="mt-4">
      Resident's Name:
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form_input ml-5"
        required
      />
    </label>
    <label htmlFor="roomNumber" className="mt-4">
      Room Number:
      <input
        type="text"
        id="roomNumber"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        className="form_input ml-5"
        required
      />
    </label>
    <label htmlFor="careLevel" className="mt-4">
      Care Level:
      <select
          value={careLevel}
          onChange={(e) => setCareLevel(e.target.value)}
          className="form_input ml-5"
          required
            >
          {[1, 2, 3, 4, 5, 6].map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
      </select>
    </label>
    <label htmlFor="careLevel" className="mt-4">

        Resident's Birthday:
        <input
          type="date"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="form_input ml-5"
          required
        />
      </label>

      <label htmlFor="careLevel" className="mt-4">
        Gender:
        <select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="form_input ml-5"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label htmlFor="profilePicture">Profile Picture:
      <input 
        type="file" 
        id="profilePicture" 
        accept="image/jpeg" 
        onChange={handleFileChange} 
        className="form_input ml-5 py-4"
      />
      </label>

    <div className="flex justify-between mt-6">
      <button type="submit" className="button text-white py-2 px-4 rounded ">
        Submit
      </button>
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      >
        Cancel
      </button>
    </div>
  </form>
</div>
</div>
  )
}

export default Form;
