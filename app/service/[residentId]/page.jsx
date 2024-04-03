"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WillowAi from '../../../components/WillowAi';

const Plan = ({params}) => {
  const {residentId} = params;

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
        console.log(data[0])
        setResidentInfo({
          ...residentInfo,
          clientName: data[0].name,
          dob: data[0].birthday,
          age: data[0].age,
          sex: data[0].gender,
          date: data[0].date
        })

        if (data[0].gender === "Male") {
          console.log("man")
          document.getElementById("male").checked = true;
        } else if (data[0].gender === "Female") {
          console.log("woman")
          document.getElementById("female").checked = true;
        }
        console.log(data)


      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);



  const router = useRouter();
  const [template_category, setTemplateCategory] = useState('Socialization');
  const [template_stateKey, setTemplateStateKey] = useState('social'); // Initial state key
  const [key, setKey] = useState(0); // Initial key
  const [willowAiJson, setWillowAiJson] = useState({}); // State to hold the JSON from WillowAi
  const handleSaveJson = (json) => {
    setWillowAiJson(json);
    console.log("Received JSON from WillowAi:", willowAiJson);
    populateFields(json);
    console.log(servicePlan)
  };


  const populateFields = (data) => {
    const category = template_stateKey;

    setServicePlan(prevServicePlan => {
      const updatedServicePlan = { ...prevServicePlan };
      Object.keys(updatedServicePlan).forEach(stateKey => {


        if (stateKey === category && data) {

          updatedServicePlan[stateKey] = {
            ...updatedServicePlan[stateKey],
            needs: data.processedNeed,
            objective: data.plan,
            time: data.timeFrame,
            responsible: data.responsiblePerson,
            method: data.method
          };



          const textareaNeeds = document.querySelector(`textarea[data-state-key = "${stateKey}"][data-type = "needs"]`)
          const textareaPlan = document.querySelector(`textarea[data-state-key = "${stateKey}"][data-type = "objective"]`)
          const textareaTime = document.querySelector(`textarea[data-state-key = "${stateKey}"][data-type = "time"]`)
          const textareaResponsible = document.querySelector(`textarea[data-state-key = "${stateKey}"][data-type = "responsible"]`)
          const textareaMethod = document.querySelector(`textarea[data-state-key = "${stateKey}"][data-type = "method"]`)

          textareaNeeds.value = data.processedNeed;
          textareaPlan.value = data.plan;
          textareaTime.value = data.timeFrame;
          textareaResponsible.value = data.responsiblePerson;
          textareaMethod.value = data.method;



        }
      })

      return updatedServicePlan;

    })
  }

  const handleEdit = (category) => {
    setTemplateCategory(category);
    setTemplateStateKey(categories.find(item => item.category === category).stateKey);
    setKey(prevKey => prevKey + 1); // Increment the key to force remount
  }


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the JSON data to the API
      const response = await fetch('/api/pdf_gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          servicePlan,
          residentInfo,
          facilityInfo,
        }),
      });

      if (response.ok) {
        // Get the bytes from the response
        const blob = await response.blob();

        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary link element and trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'downloaded_pdf.pdf'; // Name the download file as desired
        document.body.appendChild(link); // Append to the document
        link.click(); // Trigger the download

        // Clean up by removing the temporary link element
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl); // Free up memory by revoking the blob URL
      } else {
        console.error('Server responded with an error during PDF download.');
      }

    } catch (error) {
      console.error('Failed to submit the form', error);
    }
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
      // const data = await response.json();
      // console.log(data)
    } catch (error) {
      console.error('Error fetching regulations data:', error);
    }

    router.push(`/service/${residentId}`)
    return
  }

  return (
    <div className='flex'>
      <div className='w-2/3 '>
        <div className="h-screen overflow-y-auto px-5 py-5">
          <div className="bg-white w-full py-4 flex flex-col rounded-md borders shadow-custom">
            <h1 className="text-center py-6">APPRAISAL/NEEDS AND SERVICE PLAN</h1>
            {/* First row */}
            <div className="flex items-center h-full px-4">
              <div className="w-1/3 pr-2 pl-2">
                <label htmlFor="clientName" className="block text-sm  mb-1">CLIENT/RESIDENT NAME</label>
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
                <label htmlFor="dob" className="block text-sm  mb-1">DATE OF BIRTH</label>
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
                <label htmlFor="age" className="block text-sm  mb-1">AGE</label>
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
                <label className="block text-sm  mb-1">SEX</label>
                <div className="mt-1 flex">
                  <label className="inline-flex items-center mr-4">
                    <input
                      id = "male"
                      type="radio"
                      className="form-radio"
                      name="sex"
                      value="Fale"
                      checked={residentInfo.sex === "Male"}
                      onChange={handleInputChangeResident}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      id = "female"
                      type="radio"
                      className="form-radio"
                      name="sex"
                      value="Female"
                      checked={residentInfo.sex === "Female"}
                      onChange={handleInputChangeResident}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
              <div className="w-2/9 border-l pl-2">
                <label htmlFor="date" className="block text-sm  -700 mb-1">DATE</label>
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
                <label htmlFor="facilityName" className="block text-sm  mb-1">FACILITY NAME</label>
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
                <label htmlFor="address" className="block text-sm   mb-1">ADDRESS</label>
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
                <label className="block text-sm   mb-1">CHECK TYPE OF NEEDS AND SERVICE PLAN</label>
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
                <label htmlFor="referral" className="block text-sm   mb-1">PERSON(S) OR AGENCY(IES) REFERRING CLIENT FOR PLACEMENT</label>
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
                <label htmlFor="licence" className="block text-sm   mb-1">FACILITY LICENCE NUMBER</label>
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
                <label htmlFor="phone" className="block text-sm  mb-1">TELEPHONE NUMBER</label>
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
                <label htmlFor="backgroundInformation" className="block text-sm italic  mb-1">Brief description of client’s/resident’s medical history/emotional, behavioral, and physical problems; functional limitations; physical and mental; functional capabilities; ability to handle personal cash resources and perform simple homemaking tasks; client’s/resident’s likes and dislikes</label>
                <textarea
                  id="backgroundInformation"
                  name="backgroundInformation"
                  value={residentInfo.backgroundInformation}
                  onChange={handleInputChangeResident}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                  rows="4" // Adjust the number of rows as needed
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between items-center h-full px-4 mt-4 py-4">

              <table className="border-collapse w-full pt-10">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border label border-gray-400 px-4 py-2 w-1/5">NEEDS</th>
                    <th className="border label border-gray-400 px-4 py-2 w-1/5">OBJECTIVE/PLAN</th>
                    <th className="border label border-gray-400 px-4 py-2 w-1/5">TIME FRAME</th>
                    <th className="border label border-gray-400 px-4 py-2 w-1/5">PERSON(S) RESPONSIBLE</th>
                    <th className="border label border-gray-400 px-4 py-2 w-1/5">METHOD OF EVALUATING PROGRESS</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item, index) => (
                    [
                      <tr key={`category-${index}`}>
                        <th className="border border-gray-400 px-4 py-2 text-left" colSpan="5">
                          <div className="flex justify-between items-center">
                            <div className='body-text'>
                              <span className="font-bold">{item.category}</span> — {item.description}
                            </div>
                          </div>
                        </th>
                      </tr>,
                      <tr key={`${index}-content`}>
                        <th className="border border-gray-400 px-4 py-2">
                          <textarea
                            onClick={() => handleEdit(item.category)}
                            data-state-key={item.stateKey}
                            data-type="needs"
                            value={servicePlan[item.stateKey].needs}
                            onChange={(e) => handleInputChange(item.stateKey, 'needs', e.target.value)}
                            className="w-full input-text h-64 border-none outline-none resize-none "
                          />
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                          <textarea
                            onClick={() => handleEdit(item.category)}
                            data-state-key={item.stateKey}
                            data-type="objective"
                            value={servicePlan[item.stateKey].objective}
                            onChange={(e) => handleInputChange(item.stateKey, 'objective', e.target.value)}
                            className="w-full input-text h-64 border-none outline-none resize-none"
                          />
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                          <textarea
                            onClick={() => handleEdit(item.category)}
                            data-state-key={item.stateKey}
                            data-type="time"
                            value={servicePlan[item.stateKey].time}
                            onChange={(e) => handleInputChange(item.stateKey, 'time', e.target.value)}
                            className="w-full input-text h-64 border-none outline-none resize-none"
                          />
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                          <textarea
                            onClick={() => handleEdit(item.category)}
                            data-state-key={item.stateKey}
                            data-type="responsible"
                            value={servicePlan[item.stateKey].responsible}
                            onChange={(e) => handleInputChange(item.stateKey, 'responsible', e.target.value)}
                            className="w-full input-text h-64 border-none outline-none overflow-hidden resize-none"
                          />
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                          <textarea
                            onClick={() => handleEdit(item.category)}
                            data-state-key={item.stateKey}
                            data-type="method"
                            value={servicePlan[item.stateKey].method}
                            onChange={(e) => handleInputChange(item.stateKey, 'method', e.target.value)}
                            className="w-full input-text h-64 border-none outline-none resize-none"
                          />
                        </th>
                      </tr>
                    ]
                  ))}
                </tbody>

              </table>
            </div>
            <div className="flex justify-center">
              <button onClick={handleSubmit} className="text-white py-2 px-4 rounded inline-block">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-1/3 h-screen overflow-y-auto rounded-lg'>

        <WillowAi key={key} category={template_category} onSave={handleSaveJson} />

      </div>
    </div>
  );
};

export default Plan;














// "use client"

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';



// function ProfilePage({params}) {
//   const [userInfo,setUserInfo] = useState(null)
//   const  residentId  = params.residentId
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const openService = (residentId) => {
//     router.push(`/service/${residentId}`);
//   };


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('/api/residents/fetch_single', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             id: residentId
//           })
//         });
//         const data = await response.json();
//         setUserInfo(data[0])
//         setResidentInfo({
//           ...residentInfo,
//           clientName: data[0].name,
//           dob: data[0].birthday,
//           age: data[0].age,
//           sex: data[0].gender,
//           date: data[0].date
//         })
//         console.log(data)
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const [residentInfo, setResidentInfo] = useState({
//     clientName: '',
//     dob: '',
//     age: '',
//     sex: '',
//     date: '',
//     backgroundInfo: '',
//   });


  

//   return (
//     (userInfo !== null && 
//       <div className="flex justify-center items-start mt-10 h-screen">
//         <div className="bg-white p-8 rounded-lg w-3/4 h-1/3 flex flex-col">
//           <h2 className="font-bold mb-4">Service Plan For: {userInfo.name}</h2>
//         </div>
//       </div>
//     )
    
//   )
// }

// export default ProfilePage