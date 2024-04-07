"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
);

const Form = ({params}) => {
  const {residentId} = params
  const [receivedData, setReceivedData] = useState(false);

  const [residentInfo, setResidentInfo] = useState({
    name: '',
    roomNumber: '',
    careLevel: '',
    SSN: '',
    birthday: '',
    gender: 'Male',
    roomPhone: '',
    address: '',
    phoneNumber: '',
    placeOfBirth: '',
    fileNumber: '',
    race: '',
    hairColor: '',
    eyeColor: '',
    height_weight: '',
    married: '',
    religion: '',
    admissionDate: '',
    mobility:'',
    email:'',
    dementia: false,
    income: [],
    marks: '',
    notes: ''
  });





  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchResidentInfo = async () => {
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
      const obj = data[0]
      setResidentInfo({
        ...residentInfo,
        name: obj.basic_info.name,
        birthday: obj.basic_info.birthday,
        age: obj.basic_info.age,
        address: obj.basic_info.address,
        gender: obj.basic_info.gender,
        email: obj.basic_info.email,
        phoneNumber: obj.basic_info.phoneNumber,
        placeOfBirth: obj.basic_info.placeOfBirth,
        roomNumber: obj.basic_info.roomNumber,
        roomPhone: obj.basic_info.roomPhone,
        ssn: obj.basic_info.ssn,
        eyeColor: obj.misc.eyeColor,
        hairColor: obj.misc.hairColor,
        height_weight: obj.misc.height_weight,
        married: obj.misc.married,
        race: obj.misc.race,
        religion: obj.misc.religion,
        admissionDate: obj.stay.admissionDate,
        mobility: obj.stay.mobility,
        marks: obj.stay.marks,
        dementia: (obj.stay.dementia === 'true' ? true : false),
        careLevel: obj.stay.careLevel,
        fileNumber: obj.stay.fileNumber,
        income: obj.stay.income,
        notes: obj.stay.notes
      })
      setDiagnoses(obj.stay.diagnoses.split(','))
      setAllergies(obj.stay.allergies.split(','))
      setFlags(obj.stay.flags.split(','))

      console.log(data)
      setReceivedData(true);
    } catch (error) {
      console.error('Error fetching regulations data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'loading') return;
    fetchResidentInfo();
  }, [status, router]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  const backToProfile = (residentId) => {
    router.push(`/residents/profile/${residentId}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (residentInfo.name === '') {
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    for (const key in residentInfo) {
      if (Object.hasOwnProperty.call(residentInfo, key)) {
        const value = residentInfo[key];
        formData.append(key, value);
      }
    }
    console.log(diagnoses)
    formData.append('diagnoses', diagnoses);
    formData.append('allergies', allergies);
    formData.append('flags', flags);
    formData.append('user_email', session?.user.email);
    formData.append('responsible', session?.user.name);
    formData.append('id', residentId)

    try {
      
      const response = await fetch('/api/residents/edit', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setResidentInfo({
          ...residentInfo,
          name: '',
          roomNumber: '',
          careLevel: '',
          birthday: '',
          gender: 'Male',
          pic: {},
          roomPhone: '',
          phoneNumber: '',
          placeOfBirth: '',
          fileNumber: '',
          race: '',
          hairColor: '',
          eyeColor: '',
          height_weight: '',
          married: '',
          religion: '',
          admissionDate: '',
          address: '',
          mobility: '',
          email: '',
          dementia: false,
          income: [],
          marks: '',
          notes: ''

        });
        backToProfile(residentId);
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setSubmitting(false);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setResidentInfo({ ...residentInfo, pic: file });
  };

  
  

  const commonRaces = [
    'White',
    'Black or African American',
    'American Indian or Alaska Native',
    'Asian',
    'Hispanic or Latino',
    'Mixed Race',
    'Other'
  ];

  const incomeOptions = [
    "City Subsidy",
    "Food Stamps",
    "Long Term Care Insurance",
    "Medicaid Waiver",
    "Medical Assistance",
    "Medical Insurance",
    "Pace",
    "PC Supplement",
    "Private",
    "Public Welfare",
    "Rep Payee",
    "Social Security",
    "SSDI",
    "SSI",
    "Third Party Agreement",
    "Unknown",
    "Veterans Aid and Attendance"
  ];

  const [diagnoses, setDiagnoses] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [flags, setFlags] = useState([]);
  


  const possibleDiagnoses = ["Hypertension", "Diabetes Mellitus", "Osteoarthritis", "Chronic Obstructive Pulmonary Disease (COPD)", "Heart Failure", "Atrial Fibrillation", "Depression", "Stroke", "Coronary Artery Disease", "Chronic Kidney Disease", "Peripheral Vascular Disease", "Osteoporosis", "Anemia", "Chronic Pain", "Parkinson's Disease", "Cataracts", "Glaucoma", "Hearing Loss", "Rheumatoid Arthritis", "Gastroesophageal Reflux Disease (GERD)"];
  const possibleAllergies = [
    "Peanuts", "Shellfish", "Dairy", "Gluten (wheat)", "Soy", "Eggs", "Fish", "Tree nuts",
    "Sesame", "Medications", "Latex", "Chemicals/Cleaning Products", "Fragrances/Perfumes",
    "Dust", "Pet Dander", "Mold", "Cosmetics/Personal Care Products", "Insect Bites", "Sunscreen"
  ];
  const possibleFlags = [
    "1 Person Assist - Transfer", "2 Person Assist - Mobility", "2 Person Assist - Transfer",
    "Advanced Directive", "Alcohol/Wine Order", "Beauty Shop", "CHF Factors", "Communication - Non-Verbal",
    "Communication - Verbal", "CPR", "Decision-Making Capacity Risk", "Diabetic (NIDDM)", "DNI",
    "DNR Order Signed by Physician", "Elopement Risk", "ETOH Use", "Fall Risk", "Flight Risk", "Full Code",
    "Guardianship", "History of illicit drug use", "IDDM", "Laundry", "Living Will", "Living Will (Contains DNR Request)",
    "Medicine Allergies", "MOLST", "MOST", "Newspaper", "Non-English Speaking", "OHDNR", "Other Allergies",
    "Pacemaker", "POLST", "POST", "Power Of Attorney", "Proxy Caregiver", "Receives Antibiotics",
    "Receives Anticoagulants", "Receives Psychotropics", "Resident is in Secured Dementia Unit", "Served Overseas",
    "Smoker"
  ];
  
  

  const addItemToList = (item, category) => {
    switch (category) {
      case 'diagnoses':
        if (!diagnoses.includes(item)) {
          setDiagnoses([...diagnoses, item]);
        } else {
          setDiagnoses(diagnoses.filter(diagnosis => diagnosis !== item));
        }
        break;
      case 'allergies':
        if (!allergies.includes(item)) {
          setAllergies([...allergies, item]);
        } else {
          setAllergies(allergies.filter(allergy => allergy !== item));
        }
        break;
      case 'flags':
        if (!flags.includes(item)) {
          setFlags([...flags, item]);
        } else {
          setFlags(flags.filter(flag => flag !== item));
        }
        break;
      default:
        break;
    }
  };

  const [dropdown, setDropdown] = useState(null)

  const handleDropdownToggle = (category) => {

    if (!dropdown) {
        setDropdown(category)
    }

    else {
      if (category === dropdown) {
        setDropdown(null)
      }

      else {
        setDropdown(category)
      }
    }
    console.log(category)
  };

  const DropdownMenu = ({ options, selectedOptions, onSelect, category }) => (
    <div className="bg-white p-4 rounded-md borders shadow-custom">
      <label className='label'>Please select {category}</label>
      <div className='mt-2'>
      {options.map((option, index) => (
        <div key={index} className="checkbox-item py-1">
          <input
            type="checkbox"
            id={`option-${index}`}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => onSelect(option)}
            className='m-2'
          />
      <label htmlFor={`${category}-${index}`}>{option}</label>
        </div>
      ))}
      </div>
    </div>
  );

  const handleIncomeChange = (option) => {
    console.log(residentInfo.income)

    const updatedIncome = residentInfo.income.includes(option)
      ? residentInfo.income.filter((item) => item !== option) // Remove the option if already selected
      : [...residentInfo.income, option]; // Add the option if not already selected

    setResidentInfo({
      ...residentInfo,
      income: updatedIncome
    }); // Update the state with the new income array
  };

  return ( receivedData ? 
    <div className="h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-center mt-10">
        Edit Resident Details
      </h2>

      <div className="flex items-center justify-center">
        <div className="w-full  p-5">
          <form onSubmit={handleSubmit}>
            <div className="w-full bg-white borders rounded-md shadow-custom">
              <div className="flex flex-row">

                
                <label htmlFor="name" className="mt-4 mx-4 w-1/3">
                  Resident's Name:
                  <input
                    type="text"
                    id="name"
                    value={residentInfo.name}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        name: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md px-1"
                    required
                  />
                </label>

                <label htmlFor="careLevel" className="mt-4 mx-4  w-1/3">
                  Gender:
                  <select
                    name="gender"
                    value={residentInfo.gender}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        gender: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label htmlFor="birthday" className="mt-4 mx-4  w-1/3">
                  Date of Birth:
                  <input
                    type="date"
                    name="birthday"
                    value={residentInfo.birthday}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        birthday: e.target.value
                      })
                    }
                    max={new Date().toISOString().split('T')[0]} // Set max attribute to current date
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    required
                  />
                </label>
              </div>

              <div className="flex flex-row">

              <label htmlFor="telephone" className="mt-4 mx-4 w-1/3">
                  Telephone:
                  <input
                    type="tel"
                    id="telephone"
                    value={residentInfo.phoneNumber}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        phoneNumber: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    placeholder="XXX-XXX-XXXX"
                    required
                  />
                </label>


              <label htmlFor="telephone" className="mt-4 mx-4 w-1/3">
                  Email Address:
                  <input
                    type="email"
                    id="email"
                    value={residentInfo.email}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        email: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md px-1"
                  />
                </label>

              
              
                <label htmlFor="roomNumber" className="mt-4 mx-4  w-1/3">
                  Room Number:
                  <input
                    type="text"
                    id="roomNumber"
                    value={residentInfo.roomNumber}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        roomNumber: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md  px-1"
                    required
                  />
                </label>

              </div>

              <div className="flex flex-row">
              <label htmlFor="roomPhone" className="mt-4 mx-4 w-1/3">
                  Room Phone:
                  <input
                    type="tel"
                    id="roomPhone"
                    value={residentInfo.roomPhone}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        roomPhone: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md  px-1"
                    placeholder="XXX-XXX-XXXX"
                    
                  />
                </label>

                <label htmlFor="SSN" className="mt-4 mx-4 w-1/3">
                  SSN:
                  <input
                    type="text"
                    id="SSN"
                    value={residentInfo.SSN}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        SSN: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md px-1"
                  />
                </label>
                <label htmlFor="fileNumber" className="mt-4 mx-4 w-1/3">
                  File Number:
                  <input
                    type="text"
                    id="fileNumber"
                    value={residentInfo.fileNumber}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        fileNumber: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md  px-1"
                    
                  />
                </label>
              </div>
              <div className="flex flex-row">
              <label htmlFor="admission" className="mt-4 mx-4 w-1/3">
                  Date of Admission:
                  <input
                    type="date"
                    name="admission"
                    value={residentInfo.admissionDate}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        admissionDate: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    required
                  />
                </label>
                <label htmlFor="address" className="mt-4 mx-4 w-1/3">
                  Previous Address
                  <input
                    type="address"
                    name="address"
                    value={residentInfo.address}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        address: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    
                  />
                </label>

                <label htmlFor="maritial_status" className="mt-4 mx-4 w-1/3">
                    Maritial Status:
                    <select
                    name="married"
                    value={residentInfo.married}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        married: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    
                  >
                  <option value="">- Select One -</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Partnered">Partnered</option>
                  <option value="Religious">Religious</option>
                  <option value="Separated">Separated</option>
                  <option value="Single">Single</option>
                  <option value="Unknown">Unknown</option>
                  <option value="Widowed">Widowed</option>

                  </select>
                  </label>


            </div>

              <div className="flex flex-row">
                <label htmlFor="race" className="mt-4 mx-4 w-1/3">
                  Race:
                  <select
                    name="race"
                    value={residentInfo.race}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        race: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    
                  >
                    <option value="">- Select One -</option>

                    {commonRaces.map((race, index) => (
                      <option key={index} value={race}>
                        {race}
                      </option>
                    ))}
                  </select>
                </label>

                <label htmlFor="hairColor" className="mt-4 mx-4 w-1/3">
                  Spoken Language:
                  <input
                    type="text"
                    id="language"
                    value={residentInfo.language}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        language: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md px-1"
                  />
                </label>

                

                <label htmlFor="height_weight" className="mt-4 mx-4 w-1/3">
                  Height & Weight:
                  <input
                    type="text"
                    id="height/weight"
                    value={residentInfo.height_weight}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        height_weight: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md px-1"
                  />
                </label>


              </div>
              <div className="flex flex-row">

              <label htmlFor="hairColor" className="mt-4 mx-4 w-1/3">
                  Hair Color:
                  <input
                    type="text"
                    id="hairColor"
                    value={residentInfo.hairColor}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        hairColor: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md px-1"
                  />
                </label>

              <label htmlFor="eyeColor" className="mt-4 mx-4 w-1/3">
                  Eye Color:
                  <input
                    type="text"
                    id="eyeColor"
                    value={residentInfo.eyeColor}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        eyeColor: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md px-1"
                  />
                </label>
                

                <label htmlFor="religion" className="mt-4 mx-4 w-1/3">
                Religion:
                <input
                  type="text"
                  id="religion"
                  value={residentInfo.religion}
                  onChange={(e) =>
                    setResidentInfo({
                      ...residentInfo,
                      religion: e.target.value
                    })
                  }
                  className="form_input mr-3 ml-2 borders rounded-md px-1"
                />
                </label>

                
              </div>

             

              <label
                htmlFor="profilePicture"
                className="mt-4 mx-4">
                Profile Picture:
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/jpeg"
                  onChange={handleFileChange}
                  className="form_input mr-3 ml-2 py-4"
                />
              </label>
            </div>

            <div className="w-full bg-white borders rounded-md shadow-custom mt-5">
            <div className="flex flex-row">
              <label htmlFor="mobility" className="my-4 mx-4">
                  Mobility Needs
                  <select
                    name="mobility"
                    value={residentInfo.mobility}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        mobility: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    
                  >
                    <option value="">- Select One -</option>
                    <option value="Ambulatory">Ambulatory</option>
                    <option value="Limited Weight Bearing">Limited Weight Bearing</option>
                    <option value="Non-Ambulatory">Non-Ambulatory</option>
                    <option value="Bed-Ridden">Bed-Ridden</option>

                  </select>
                </label>

                <label htmlFor="mobility" className="my-4 mx-4">
                  Care Level
                  <select
                    name="mobility"
                    value={residentInfo.careLevel}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        careLevel: e.target.value
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                    
                  >
                    <option value="">- Select One - </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>

                <label htmlFor="dementia" className="my-4 mx-4">
                  Dementia?
                  <input
                    type="checkbox"
                    id="dementia"
                    checked={residentInfo.dementia}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        dementia: e.target.checked
                      })
                    }
                    className="form_input mr-3 ml-2 borders rounded-md pl-1"
                  />
                  </label>
            </div>

            <div className="flex flex-row">

          <div className='w-full rounded-md border shadow-custom mx-4 mb-4 flex flex-col gray-12-bg'>

              <div className="rounded-t-md p-4 label bg-white">
                Resident Flags
              </div>

          <div className='flex flex-row'>

            <div className= {dropdown ? 'w-1/2': 'w-full'}>

              <div className='px-3'>
                
              <div className="py-3 flex flex-col">
                <div className='flex flex-row'>
                  <div className={dropdown ? 'w-2/5 mr-1' : 'w-1/5'}>
                    <label className="title-text label px-1">Diagnoses:</label>
                  </div>
                  <div className={dropdown ? 'w-1/5' : 'w-1/5'}>
                      <img src="/assets/icons/add.svg" alt="Add" onClick={() => handleDropdownToggle('diagnoses')} />
                  </div>
                </div>

                <div className="section-content body-text pt-2">
                      {diagnoses.map((diagnosis, index) => (
                        <div key={index} className='py-1'>- {diagnosis}</div>
                      ))}
                </div>      
              </div>

              <div className="py-3 flex flex-col">
                <div className='flex flex-row'>
                  <div className={dropdown ? 'w-2/5 mr-1' : 'w-1/5'}>
                    <label className="title-text label px-1">Allergies:</label>
                  </div>
                  <div className={dropdown ? 'w-1/5' : 'w-1/5'}>
                      <img src="/assets/icons/add.svg" alt="Add" onClick={() => handleDropdownToggle('allergies')} />
                  </div>
                </div>

                <div className="section-content body-text pt-2">
                      {allergies.map((allergy, index) => (
                        <div key={index} className='py-1'>- {allergy}</div>
                      ))}
                </div>      
              </div>

              <div className="py-3 flex flex-col">
                <div className='flex flex-row'>
                  <div className={dropdown ? 'w-2/5 mr-1' : 'w-1/5'}>
                    <label className="title-text label px-1">Flags:</label>
                  </div>
                  <div className={dropdown ? 'w-1/5' : 'w-1/5'}>
                      <img src="/assets/icons/add.svg" alt="Add" onClick={() => handleDropdownToggle('flags')} />
                  </div>
                </div>

                <div className="section-content body-text pt-2">
                      {flags.map((flag, index) => (
                        <div key={index} className='py-1'>- {flag}</div>
                      ))}
                </div>      
              </div>

                
              </div>
        </div>

        {dropdown && (
          <div className='w-1/2 flex items-start'>
            <DropdownMenu
              options={dropdown === 'diagnoses' ? possibleDiagnoses : dropdown === 'allergies' ? possibleAllergies : possibleFlags}
              onSelect={(item) => addItemToList(item, dropdown)}
              category={dropdown}
              selectedOptions={dropdown === 'diagnoses' ? diagnoses : dropdown === 'allergies' ? allergies : flags}
            />
          </div>
        )}

        </div>
        </div>

            <div className='w-full rounded-md borders shadow-custom mx-4 mb-4 gray-12-bg'>


            <div className="p-4 label bg-white  rounded-t-md" >
              Income
            </div>

            <div className=''>

            {incomeOptions.map((option, index) => (
              <div key={index} className="flex items-center px-3 py-1">
                <input
                  type="checkbox"
                  id={option}
                  checked={residentInfo.income.includes(option)}
                  onChange={() => handleIncomeChange(option)}
                  className="p-3"
                />
                <label htmlFor={option} className="ml-2">{option}</label>
              </div>
            ))}
            </div>

            </div>


            </div>

            <div className="flex flex-col">
              <div className='flex flex-row p-4'>
                <label htmlFor="placeOfBirth" className='w-1/5'>
                  Identifying Marks
                  </label>
                  <textarea
                    type="text"
                    id="marks"
                    value={residentInfo.marks}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        marks: e.target.value
                      })
                    }
                    className="w-full mr-3 borders rounded-md  pl-1"
                  />
              </div>

              <div className='flex flex-row p-4'>
                <label htmlFor="placeOfBirth" className='w-1/5'>
                  Other Notes:
                  </label>
                  <textarea
                    type="text"
                    id="marks"
                    value={residentInfo.notes}
                    onChange={(e) =>
                      setResidentInfo({
                        ...residentInfo,
                        notes: e.target.value
                      })
                    }
                    className="w-full mr-3 borders rounded-md  pl-1"
                  />
              </div>
                
              </div>



            </div>


            

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="button text-white py-2 px-4 rounded"
                disabled={submitting}
              >
                {submitting ? 'Loading...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={() => backToProfile(residentId)}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  :

  <div className="h-screen overflow-y-auto">
  </div>

  );
};

export default Form;
