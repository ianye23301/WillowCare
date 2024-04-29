import supabase from '/utils/supabase';

export const POST = async(request, res) => {

    try {
        const { id, document } = await request.json()
        const { data, error } = await supabase
        .storage
        .from('forms')
        .download(`${id}/${document}`)

    const headers = {
        'Content-Type': 'application/pdf', // Adjust content type as needed
        'Content-Disposition': 'attachment; filename="downloaded_file.pdf"',
      };

      console.log(id)
      console.log(document)
      console.log(data)
  
      // Create a new Response with file data and headers
        const fileResponse = new Response(data, { headers });
  
      // Return the response
        return fileResponse;
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
    
}