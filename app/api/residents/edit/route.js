import supabase from '/utils/supabase';

function getCurrentAge(currentDateString, birthdayDateString) {
  const currentDate = new Date(currentDateString);
  const birthdayDate = new Date(birthdayDateString);

  // Calculate the difference in years
  let age = currentDate.getFullYear() - birthdayDate.getFullYear();

  // Check if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthdayDate.getMonth() ||
    (currentDate.getMonth() === birthdayDate.getMonth() &&
      currentDate.getDate() < birthdayDate.getDate())
  ) {
    age--;
  }

  return age;
}

export const POST = async(request, res) => {

  const formData = await request.formData();


  const id = formData.get('id')


    
  const name = formData.get('name');
  const roomNumber = formData.get('roomNumber');
  const birthday = formData.get('birthday');
  const gender = formData.get('gender');
  const phoneNumber = formData.get('phoneNumber');
  const placeOfBirth = formData.get('placeOfBirth');
  const roomPhone = formData.get('roomPhone');
  const email = formData.get('email');
  const SSN = formData.get('SSN');

  const hairColor = formData.get('hairColor');
  const eyeColor = formData.get('eyeColor');
  const height_weight = formData.get('height_weight');
  const married = formData.get('married');
  const religion = formData.get('religion');




  const careLevel = formData.get('careLevel');
  const fileNumber = formData.get('fileNumber');
  const race = formData.get('race');
  const address = formData.get('address')
  const admissionDate = formData.get('admissionDate');
  const mobility = formData.get('mobility');
  const dementia = formData.get('dementia');
  const income = formData.getAll('income');
  const diagnoses = formData.get('diagnoses')
  const allergies = formData.get('allergies')
  const flags = formData.get('flags')
  const marks = formData.get('marks')
  const notes = formData.get('notes')




  const user_email = formData.get('user_email');
  const responsible = formData.get('responsible');
  const age = getCurrentAge(admissionDate, birthday)


  const basic_info = {
    name: name,
    roomNumber: roomNumber,
    birthday: birthday,
    gender: gender,
    phoneNumber: phoneNumber,
    address: address,
    placeOfBirth: placeOfBirth,
    roomPhone: roomPhone,
    email: email,
    ssn: SSN,
    age: age
  }

  const misc = {
    race: race,
    hairColor: hairColor,
    height_weight: height_weight,
    eyeColor: eyeColor,
    married: married,
    religion: religion
  }

  const stay = {
    careLevel: careLevel,
    income: income,
    diagnoses: diagnoses,
    allergies: allergies,
    flags: flags,
    dementia: dementia,
    mobility: mobility,
    admissionDate: admissionDate,
    responsible: responsible,
    marks: marks,
    notes: notes,
    fileNumber: fileNumber
  }



  console.log(income)

    
    
    // const req = await fetchTasks(user_email)
    // const tasks = JSON.parse(req)

    console.log(name)


    
    try{


      const { data: rows, error } = await supabase
        .from('residents')
        .update({
            basic_info: basic_info,
            stay: stay,
            misc: misc,
            user_email: user_email
        })
        .eq('id', id)
        
  const responseBody = JSON.stringify(rows);


      return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json'
        }



    });
    } catch(error) {
      console.error('Error uploading file to Supabase:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
}
   

        // Return response with rows data
        
    }