import supabase from '/utils/supabase';


export const POST = async(request, res) => {
    const formData = await request.formData();
    const file = formData.get('file');
    const id = formData.get('id');
    const path = formData.get('path')
    
    try {
        const { data, error } = await supabase.storage.from('forms').update(`${id}/${path}`,file, {
          cacheControl: '3600',
          upsert: true
        });

        const currentTimestamp = Date.now();
        console.log(currentTimestamp)
        const { update, er } = await supabase
            .from('move-ins')
            .update({ 'last_updated' :currentTimestamp })
            .eq('id', id);
      
          if (error) throw error;

        
        const responseBody = JSON.stringify(data);
        return new Response(responseBody, {
          headers: {
              'Content-Type': 'application/json'
          }
        })

      } catch (error) {
        console.error('Error uploading file to Supabase:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
}
 
