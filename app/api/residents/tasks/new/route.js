import supabase from '/utils/supabase';

export const POST = async(request) => {

    const {id, tasks, newTask} = await request.json()

   
    tasks.push(newTask)
    console.log(tasks)

    const { data, error } = await supabase
    .from('resident_tasks')
    .update({tasks, tasks})
    .eq('id', id);


        // Return response with rows data
    return new Response( {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}