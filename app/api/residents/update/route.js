import supabase from "/utils/supabase";


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
  try {
    const { resident_id, user_email } = await request.json()
    const req = await fetchTasks(user_email)
    const tasks = JSON.parse(req)
    const {data: residents, error} = await supabase
    .from('residents')
    .select('*')
    .eq('user_email',user_email)

    if (error) {
      throw error;
    }

    for (const resident of residents) {
      const { data: updatedResident, error: updateError } = await supabase
                .from('residents')
                .update({ tasks: tasks })
                .eq('id', resident.id)
                .single();
        if (updateError) {
          console.error(`Error updating tasks for resident with id ${resident.id}:`, updateError);
      }
    }
    return new Response()
  } catch (error){
    console.error('Error updating tasks for residents:', error);
        return {
            status: 500,
            body: "Internal Server Error"
      }
    }
}