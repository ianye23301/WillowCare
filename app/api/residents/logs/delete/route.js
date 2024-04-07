import supabase from '/utils/supabase';

export const POST = async(request) => {

    const {id, logs} = await request.json()
    console.log(id)
    console.log(logs)
   
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