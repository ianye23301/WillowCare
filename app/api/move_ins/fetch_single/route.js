import { identityMatrix } from 'pdf-lib/cjs/types/matrix';
import supabase from '/utils/supabase';

export const POST = async(request) => {
    const {id} = await request.json()

    let { data: rows, error } = await supabase
    .from('move-ins')
    .select('*')
    .eq('id',id)
    

    const responseBody = JSON.stringify(rows);

        // Return response with rows data
        return new Response(responseBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
}