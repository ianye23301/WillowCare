import supabase from '/utils/supabase';
import { v4 as uuidv4 } from 'uuid';


const fetchTasks = async(email) => {
    try {
        // Ensure session is available
          const response = await fetch('http://localhost:3000/api/reg/fetch', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_email: email 
            })
          });
          const data = await response.json();
          const res_tasks = data.filter((task) => task["pr"]===true)
          return JSON.stringify({tasks: res_tasks})
        
      } catch (error) {
        console.error('Error fetching regulations data:', error);
      }
}

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

export const POST = async(request) => {

  const formData = await request.formData();

    const name = formData.get('name')
    const roomNumber = formData.get('roomNumber')
    const careLevel = formData.get('careLevel');
    const date = formData.get('date');
    const user_email = formData.get('user_email');
    const responsible = formData.get('responsible');
    const birthday = formData.get('birthday');
    const gender = formData.get('gender');
    const file = formData.get('file');
    
    if (!file) {
      console.log("No profile picture")
    }
    const req = await fetchTasks(user_email)
    const tasks = JSON.parse(req)
    const age = getCurrentAge(date, birthday)


    
    try{

      const user_id = uuidv4();


      // try {
        if (file) {
          try {
            const { data, error } = await supabase.storage.from('pictures').upload(user_id,file, {
              contentType: file.mimetype,
              cacheControl: '3600'
            });

          } catch (error) {
            res = new Response()
            console.error('Error uploading file to Supabase:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
          }
        }
      // }
      // catch (error) {
      //   console.log("error uploading file")
      // }

      let { data: rows, error } = await supabase
      .from('residents')
      .insert({id: user_id, name : name, date : date, care_level: careLevel, room: roomNumber, responsible: responsible, birthday: birthday, age: age, tasks: tasks, gender: gender, user_email: user_email})
      const responseBody = JSON.stringify(rows);
      return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    } catch(error) {
      res = new Response()
      console.error('Error uploading file to Supabase:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
}
   

        // Return response with rows data
        
    }