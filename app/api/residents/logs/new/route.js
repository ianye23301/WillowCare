import supabase from '/utils/supabase';

export const POST = async(request) => {

    const {id, logs, newLog} = await request.json()
   
    logs.push(newLog)

    const { data, error } = await supabase
    .from('resident_logs')
    .update({logs, logs})
    .eq('resident_id', id);

        // Return response with rows data
    return new Response( {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}