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

export const POST = async(request) => {
    const { name, roomNumber, careLevel, date, user_email } = await request.json()
    const req = await fetchTasks(user_email)
    const tasks = JSON.parse(req)

    let { data: rows, error } = await supabase
    .from('residents')
    .insert({ name : name, date : date, care_level: careLevel, room: roomNumber, user_email: user_email, tasks: tasks})

    const responseBody = JSON.stringify(rows);

        // Return response with rows data
        return new Response(responseBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }