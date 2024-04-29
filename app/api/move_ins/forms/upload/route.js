import supabase from '/utils/supabase';


export const POST = async(request, res) => {
    const formData = await request.formData();
    const file = formData.get('file');
    const id = formData.get('id');
    const path = formData.get('path')
    const editor = formData.get('editor')
    const complete = formData.get('complete')
    const currentTimeStamp = Date.now();
    const formName = formData.get('formName')

    
    try {
        const { data, error } = await supabase.storage.from('forms').update(`${id}/${path}`,file, {
          cacheControl: '3600',
          upsert: true
        });

        const { time, err } = await supabase
        .from('move-ins')
        .update({ last_updated: currentTimeStamp })
        .eq('id', id);

        const { edit, er } = await supabase
        .from('move-ins')
        .update({ editor: editor })
        .eq('id', id);

        //if saved and not marked as complete, change to false
        //if saved and marked as complete, change to true

        let { data: forms, e } = await supabase
        .from('move-ins')
        .select('forms')
        .eq('id',id)

        const formInfo = forms[0].forms

        complete == 'true' ? formInfo[formName] = true : formInfo[formName] = false;
      
        const { f, erro } = await supabase
        .from('move-ins')
        .update({ forms: formInfo })
        .eq('id', id);

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
 
