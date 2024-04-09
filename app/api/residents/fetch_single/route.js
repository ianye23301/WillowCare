import supabase from '/utils/supabase';

const checkImageExists = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      return response.ok;
    } catch (error) {
      console.error('Error checking image existence:', error);
      return false;
    }
  };


const fetchImage = async (id) => {
    const { data, error } = await supabase.storage.from('pictures').getPublicUrl(id);
    const url = data.publicUrl

    if (await checkImageExists(url)) {
        console.log(url)
        return url
    } else {
        const def = '/assets/images/default.jpg'
        return def
    }


}

export const POST = async(request) => {

    const {id} = await request.json()

    let { data: data, error } = await supabase
    .from('residents')
    .select("*")
    .eq('id',id)

    let { data: tasks, err } = await supabase
    .from('resident_tasks')
    .select("tasks")
    .eq('id',id) 

    let { data: logs, e } = await supabase
    .from('resident_logs')
    .select("logs")
    .eq('resident_id',id) 

    let url = await fetchImage(id)
    console.log(url)

    data[0]["tasks"] = tasks[0]["tasks"]
    data[0]["logs"] = logs[0]["logs"]
    data[0]["image"] = url


    const responseBody = JSON.stringify(data);

        // Return response with rows data
    return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}