import supabase from '/utils/supabase';

export const POST = async(request) => {
    const {user_email} = await request.json()
    
    console.log(user_email)

    let { data: rows, error } = await supabase
    .from('move-ins')
    .select('*')
    .eq('user_email',user_email)
    
    console.log(rows)

    const responseBody = JSON.stringify(rows);

        // Return response with rows data
        return new Response(responseBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
}