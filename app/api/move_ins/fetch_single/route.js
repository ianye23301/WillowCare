import { identityMatrix } from 'pdf-lib/cjs/types/matrix';
import supabase from '/utils/supabase';

export const POST = async(request) => {
    const {id} = await request.json()
    
    console.log(id)

    let { data: rows, error } = await supabase
    .from('move-ins')
    .select('*')
    .eq('id',id)
    
    console.log(rows)

    const responseBody = JSON.stringify(rows);

        // Return response with rows data
        return new Response(responseBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
}