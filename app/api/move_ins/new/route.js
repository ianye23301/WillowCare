import supabase from '/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export const POST = async(request, res) => {
    const {id, name, date, contact, user_email} = await request.json();
    try {
      let { data: rows, error } = await supabase
      .from('move-ins')
      .insert({id: id, name: name, target_date: date, contact: contact, user_email: user_email})
      const responseBody = JSON.stringify(rows);
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