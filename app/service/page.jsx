"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const Plan = () => {
  const router = useRouter();
  

  const categories = [
    {
      category: "SOCIALIZATION",
      description: "Difficulty in adjusting socially and unable to maintain reasonable personal relationships",
      stateKey: "social"
    },
    {
      category: "EMOTIONAL",
      description: "Difficulty in adjusting emotionally",
      stateKey: "emotional"
    },
    {
      category: "MENTAL",
      description: "Difficulty with intellectual functioning including inability to make decisions regarding daily living",
      stateKey: "mental"
    },
    {
      category: "PHYSICAL/HEALTH",
      description: "Difficulties with physical development and poor health habits regarding body functions",
      stateKey: "physical"
    },
    {
      category: "FUNCTIONING SKILLS",
      description: "Difficulty in developing and/or using independent functioning skills",
      stateKey: "functioning"
    }
  ];
  
  const [residentInfo, setResidentInfo] = useState({
    clientName: '',
    dob: '',
    age: '',
    sex: '',
    date: '',
    backgroundInfo: '',
  });

  const [facilityInfo, setFacilityInfo] = useState({
    facilityName: '',
    address: '',
    checkType: '',
    referral: '',
    license: '',
    phone: ''
  });

  const [servicePlan, setServicePlan] = useState({
    social: {
      needs: '',
      objective: '',
      time: '',
      responsible: '',
      method: ''
    },
    emotional: {
      needs: '',
      objective: '',
      time: '',
      responsible: '',
      method: ''
    },

    mental: {
        needs: '',
        objective: '',
        time: '',
        responsible: '',
        method: ''
    },

    physical: {
      needs: '',
      objective: '',
      time: '',
      responsible: '',
      method: ''
    },

    functioning: {
      needs: '',
      objective: '',
      time: '',
      responsible: '',
      method: ''
    }
  })



  const handleInputChange = (category, field, value) => {
    setServicePlan(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [field]: value
      }
    }));
  };

  const handleInputChangeResident = (e) => {
    const { name, value } = e.target;
    setResidentInfo({
      ...residentInfo,
      [name]: value
    });
  };

  const handleInputChangeFacility = (e) => {
    const { name, value } = e.target;
    setFacilityInfo({
      ...facilityInfo,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/service/send', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          residentInfo: residentInfo,
          facilityInfo: facilityInfo,
          serviceInfo: servicePlan
        })
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error fetching regulations data:', error);
    }

    router.push("/service")
    return
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className="bg-white w-full py-4 flex flex-col">
        <div className="text-center font-bold text-xl py-6">APPRAISAL/NEEDS AND SERVICE PLAN</div>
        {/* First row */}
        <div className="flex items-center h-full px-4">
          <div className="w-1/3 pr-2 pl-2">
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">CLIENT/RESIDENT NAME</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={residentInfo.clientName}
              onChange={handleInputChangeResident}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/9 border-l pr-2 pl-2">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">DATE OF BIRTH</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={residentInfo.dob}
              onChange={handleInputChangeResident}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/9 border-l pr-2 pl-2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">AGE</label>
            <input
              type="text"
              id="age"
              name="age"
              value={residentInfo.age}
              onChange={handleInputChangeResident}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-2/9 border-l pr-2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">SEX</label>
            <div className="mt-1 flex">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio"
                  name="sex"
                  value="male"
                  checked={residentInfo.sex === "male"}
                  onChange={handleInputChangeResident}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="sex"
                  value="female"
                  checked={residentInfo.sex === "female"}
                  onChange={handleInputChangeResident}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <div className="w-2/9 border-l pl-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
            <input
              type="date"
              id="date"
              name="date"
              value={residentInfo.date}
              onChange={handleInputChangeResident}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Second row */}
        <div className="flex items-center h-full px-4 mt-4">
        <div className="w-1/3 pr-2 pl-2">
            <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700 mb-1">FACILITY NAME</label>
            <input
              type="text"
              id="facilityName"
              name="facilityName"
              value={facilityInfo.facilityName}
              onChange={handleInputChangeFacility}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/3 pr-2 pl-2 border-l">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">ADDRESS</label>
            <input
              type="text"
              id="address"
              name="address"
              value={facilityInfo.address}
              onChange={handleInputChangeFacility}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/3 border-l pr-2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">CHECK TYPE OF NEEDS AND SERVICE PLAN</label>
            <div className="mt-1 flex">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio"
                  name="checkType"
                  value="admission"
                  checked={facilityInfo.checkType === "admission"}
                  onChange={handleInputChangeFacility}
                />
                <span className="ml-2">Admission</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="checkType"
                  value="update"
                  checked={facilityInfo.checkType === "update"}
                  onChange={handleInputChangeFacility}
                />
                <span className="ml-2">Update</span>
              </label>
            </div>
          </div>
        </div>
        {/* third row */}
        <div className="flex items-center h-full px-4 mt-4">
        <div className="w-1/3 pr-2 pl-2">
            <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">PERSON(S) OR AGENCY(IES) REFERRING CLIENT FOR PLACEMENT</label>
            <input
              type="text"
              id="referral"
              name="referral"
              value={facilityInfo.referral}
              onChange={handleInputChangeFacility}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/3 pr-2 pl-2 border-l">
            <label htmlFor="licence" className="block text-sm font-medium text-gray-700 mb-1">FACILITY LICENCE NUMBER</label>
            <input
              type="text"
              id="licence"
              name="licence"
              value={facilityInfo.licence}
              onChange={handleInputChangeFacility}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/3 pr-2 pl-2 border-l">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">TELEPHONE NUMBER</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={facilityInfo.phone}
              onChange={handleInputChangeFacility}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        {/* Fourth row */}
        <div className="flex justify-between items-center h-full px-4 mt-4">
          <div className="w-full pr-4 pl-2">
            <h2 className='pb-4'>BACKGROUND</h2>
            <label htmlFor="backgroundInformation" className="block text-sm font-medium italic text-gray-700 mb-1">Brief description of client’s/resident’s medical history/emotional, behavioral, and physical problems; functional limitations; physical and mental; functional capabilities; ability to handle personal cash resources and perform simple homemaking tasks; client’s/resident’s likes and dislikes</label>
              <textarea
                id="backgroundInformation"
                name="backgroundInformation"
                value={residentInfo.backgroundInformation}
                onChange={handleInputChangeResident}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4" // Adjust the number of rows as needed
              ></textarea>
          </div>
        </div>

        <div className="flex justify-between items-center h-full px-4 mt-4 py-4">

        <table className="border-collapse w-full pt-10 font-normal">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">NEEDS</th>
            <th className="border border-gray-400 px-4 py-2">OBJECTIVE/PLAN</th>
            <th className="border border-gray-400 px-4 py-2">TIME FRAME</th>
            <th className="border border-gray-400 px-4 py-2">PERSON(S) RESPONSIBLE</th>
            <th className="border border-gray-400 px-4 py-2">METHOD OF EVALUATING PROGRESS</th>
          </tr>
        </thead>
        <tbody>
        {categories.map((item, index) => (
      [
        <tr>
              <th className="border border-gray-400 px-4 py-2 font-normal text-left" colSpan="5">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">{item.category}</span> — {item.description}
                  </div>
                  <div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded"   style={{ width: '200px' }} onClick={() => handleEdit(item.stateKey)}>Edit to {item.stateKey}</button>
                  </div>
                </div>
              </th>
            </tr>,
        <tr key={`${index}-content`} className='font-normal'>
          <th className="border border-gray-400 px-4 py-2">
            <textarea 
              value={servicePlan[item.stateKey].needs} 
              onChange={(e) => handleInputChange(item.stateKey, 'needs', e.target.value)}
              className="w-full h-full border-none outline-none resize-none font-normal" 
            />
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <textarea 
              value={servicePlan[item.stateKey].objective} 
              onChange={(e) => handleInputChange(item.stateKey, 'objective', e.target.value)}
              className="w-full h-full border-none outline-none resize-none font-normal" 
            />
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <textarea 
              value={servicePlan[item.stateKey].time} 
              onChange={(e) => handleInputChange(item.stateKey, 'time', e.target.value)}
              className="w-full h-full border-none outline-none resize-none font-normal" 
            />
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <textarea 
              value={servicePlan[item.stateKey].responsible} 
              onChange={(e) => handleInputChange(item.stateKey, 'responsible', e.target.value)}
              className="w-full h-full border-none outline-none resize-none font-normal" 
            />
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <textarea 
              value={servicePlan[item.stateKey].method} 
              onChange={(e) => handleInputChange(item.stateKey, 'method', e.target.value)}
              className="w-full h-full border-none outline-none resize-none font-normal" 
            />
          </th>
        </tr>
      ]
    ))}
        </tbody>
      </table>
      </div>
      <div className="flex justify-center">
  <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
    Submit
  </button>
</div>

      </div>
      
    </div>
    
  );
};

export default Plan;
