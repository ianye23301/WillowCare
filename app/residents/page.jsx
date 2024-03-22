"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Form = () => {

  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [careLevel, setCareLevel] = useState(1);
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('Male');


  const { data: session, status } = useSession();
  const [userResidents, setUserResidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();


  const fetchUserResidents = async () => {
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
    } catch (error) {
      console.error('Error fetching regulations data:', error);
    }
  };

  useEffect(() => {
    fetchUserResidents();
  }, [session]);

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
    const formData = { name, roomNumber, careLevel, birthday, gender, date: currentDate, user_email: session?.user.email, responsible: session?.user.name };
    try {
      const response = await fetch('/api/residents/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setName('');
        setRoomNumber('');
        setCareLevel('');
        setBirthday('')
        setGender('')
        setShowForm(false);
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


  const openProfile = (residentId) => {
    router.push(`/profile/${residentId}`);
  };


  return (
      !showForm ? (
        <div className='h-screen'>
        <div className="mt-8 mx-auto w-4/5 max-h-80 overflow-y-auto border rounded-lg relative">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Room Number</th>
                <th className="p-2 text-left">Care Level</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Tasks</th>
                <th className="p-2 text-left">Actions</th> {/* Adjusted column header */}
              </tr>
            </thead>
            <tbody>
              {userResidents.map((resident, index) => (
                <tr key={index} className="bg-gray-100">
                  <td>{resident.name}</td>
                  <td>{resident.room}</td>
                  <td>{resident.care_level}</td>
                  <td>{resident.date}</td>
                  <td>
                    <ul>
                      {resident.tasks.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task.rn}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(resident.id)} className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 mr-2">
                      Delete
                    </button>
                    <button onClick={() => openProfile(resident.id)} className="bg-gray-400 text-white py-1 px-2 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                      Profile
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
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 block mx-auto mt-4"
        >
          {userResidents.length > 0 ? 'Add Another Resident' : 'Add a Resident'}
        </button>
      </div>
      
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

    <div className="flex justify-between mt-6">
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
