import supabase from '/utils/supabase';
import { v4 as uuidv4 } from 'uuid';


  
export const POST = async(request, res) => {
    const formData = await request.formData()
    const id = formData.get('id')
    const name = formData.get('name')
    const date = formData.get('date')
    const contact_name = formData.get('contact_name')
    const contact_phone = formData.get('contact_phone')
    const contact_email = formData.get('contact_email')

    const contact = {
      name: contact_name,
      phone: contact_phone,
      email: contact_email
    }

    const user_email = formData.get('user_email')

     

    const pdfFiles = [
        'LIC405.pdf',
        'lic601.pdf',
        'lic602a.pdf',
        'LIC603.pdf',
        'LIC604A.pdf',
        'LIC605A.pdf',
        'LIC613C.pdf',
        'LIC621.pdf',
        'LIC625.pdf',
        'LIC627C.pdf',
        'LIC9158.pdf',
        'lic9172.pdf'
      ];
      

    try {
      let { data: rows, error } = await supabase
      .from('move-ins')
      .insert({id: id, name: name, target_date: date, contact: contact, user_email: user_email})
      const responseBody = JSON.stringify(rows);

      for (const path of pdfFiles) {
        const file = formData.get(path);
        try {
          const { data, error } = await supabase.storage.from('forms').upload(`${id}/${path}`, file, {
            contentType: file.mimetype,
            cacheControl: '3600'
          });
          if (error) {
            console.error(`Error uploading ${path} to Supabase:`, error);
          } else {
            console.log(`File ${path} uploaded successfully`);
          }
        } catch (error) {
          console.error(`Error uploading ${path} to Supabase:`, error.message);
        }
      }

      return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    

    }




    catch(error) {
        console.error('Error uploading file to Supabase:', error.message);
        return res.status(500).json({ error: 'Internal server error' });

    }

}