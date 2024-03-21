import supabase from '/utils/supabase';

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
    const { name, roomNumber, careLevel, date, user_email, responsible, birthday, gender} = await request.json()
    const req = await fetchTasks(user_email)
    const tasks = JSON.parse(req)
    const age = getCurrentAge(date, birthday)
    
    try{
      let { data: rows, error } = await supabase
      .from('residents')
      .insert({ name : name, date : date, care_level: careLevel, room: roomNumber, responsible: responsible, birthday: birthday, age: age, tasks: tasks, gender: gender, user_email: user_email})
      const responseBody = JSON.stringify(rows);
      return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    } catch(error) {
      console.error("error inputting into supabase")
    }
   

        // Return response with rows data
        
    }