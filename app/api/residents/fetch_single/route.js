import supabase from '/utils/supabase';

export const POST = async(request) => {

    const {id} = await request.json()

    let { data: data, error } = await supabase
    .from('residents')
    .select("*")
    .eq('id',id)

    const responseBody = JSON.stringify(data);

        // Return response with rows data
    return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}