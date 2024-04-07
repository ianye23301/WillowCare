import React from 'react'

const Profile = ({param}) => {

  function formatDate(inputDate) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', options);
  }
  return (
        <div className='p-8 w-full flex flex-col bg-gray-50 overflow-y-auto'>
            <div className='flex flex-row min-h-2/5 overflow-y-auto'>
            <div className=" bg-white borders shadow-custom h-full w-1/2 mx-4 rounded-lg flex flex-col" >
                    <div className='mx-4 border-b'>
                        <div className='pt-4 pb-2 px-2 small-bold'>
                        Personal Information
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full px-2 py-2'>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Maritial Status:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.misc.married ? param.misc.married : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Race / Ethnicity:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.misc.race ? param.misc.race : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Religion:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.misc.religion ? param.misc.religion : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Email:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.basic_info.email ? param.basic_info.email : 'Unknown'}
                            </div>
                        </div>

                        <div className='flex flex-row px-4 py-2'>
                            <div className='small-bold w-1/2'>
                                Previous Address:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.basic_info.address ? param.basic_info.address : 'Unknown'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" bg-white borders shadow-custom h-full w-1/2 mx-4 rounded-lg flex flex-col" >
                    <div className='mx-4 border-b'>
                        <div className='pt-4 pb-2 px-2 small-bold'>
                        Admission Details
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full px-2 py-2'>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Room Number:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.basic_info.roomNumber ? param.basic_info.roomNumber: 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Room Phone:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.basic_info.roomPhone ? param.basic_info.roomPhone: 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Admission Date:
                            </div>
                            <div className='input-text w-1/2'>
                                {formatDate(param.stay.admissionDate)}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 py-2'>
                            <div className='small-bold w-1/2'>
                                Admission Type:
                            </div>
                            <div className='input-text w-1/2'>
                                Assisted Living
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className='flex flex-row min-h-2/5 mt-10 overflow-y-auto'>
                <div className=" bg-white borders shadow-custom h-full w-1/2 mx-4 rounded-lg flex flex-col" >
                    <div className='mx-4 border-b'>
                        <div className='pt-4 pb-2 px-2 small-bold'>
                        Care Information
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full px-2 py-2'>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Care Level
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.careLevel ? param.stay.careLevel : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Mobility:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.mobility ? param.stay.mobility : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Dementia:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.dementia ? 'Yes' : 'No'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Diagnoses:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.diagnoses ? param.stay.diagnoses.split(',').join(', ') : 'None'}
                            </div>
                        </div>

                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Allergies:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.allergies ? param.stay.allergies.split(',').join(', ') : 'None'}
                            </div>
                        </div>

                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Other Flags:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.flags ? param.stay.flags.split(',').join(', ') : 'None'}
                            </div>
                        </div>

                        <div className='flex flex-row px-4 py-2'>
                            <div className='small-bold w-1/2'>
                                Other Notes:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.notes ? param.stay.notes : 'None'}
                            </div>
                        </div>


                    </div>
                </div>

                <div className=" bg-white borders shadow-custom h-full w-1/2 mx-4 rounded-lg flex flex-col" >
                    <div className='mx-4 border-b'>
                        <div className='pt-4 pb-2 px-2 small-bold'>
                        Appearance
                        </div>
                    </div>
                    <div className='flex flex-col w-full h-full px-2 py-2'>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Hair Color
                            </div>
                            <div className='input-text w-1/2'>
                                {param.misc.hairColor ? param.misc.hairColor : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Eye Color
                            </div>
                            <div className='input-text w-1/2'>
                                {param.misc.eyeColor ? param.misc.eyeColor : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Height and Weight:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.misc.height_weight ? param.misc.height_weight : 'Unknown'}
                            </div>
                        </div>
                        <div className='flex flex-row px-4 pt-2'>
                            <div className='small-bold w-1/2'>
                                Identifying Marks:
                            </div>
                            <div className='input-text w-1/2'>
                                {param.stay.marks ? param.stay.marks : 'None'}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
  )
}

export default Profile
