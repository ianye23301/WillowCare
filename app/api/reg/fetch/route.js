import supabase from '/utils/supabase';

export const POST = async(request) => {
    const {user_email} = await request.json()

    let { data: rows, error } = await supabase
    .from('processed-regulations')
    .select('*')
    .eq('user_email',user_email)



    const responseBody = JSON.stringify(rows);

        // Return response with rows data
        return new Response(responseBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
}