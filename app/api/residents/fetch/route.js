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

const fetchImages = async(users) => {
    try {
        for (const user of users) {
            const { data, error } = await supabase.storage.from('pictures').getPublicUrl(user['id']);
            const url = data.publicUrl
            if (await checkImageExists(url)) {
                console.log(url)
                user.image = url
            } else {
                user.image = '/assets/images/default.jpg'
            }
        }
        return users;
    } catch (error) {
        console.error('Error fetching images:', error);
        // Handle error
        throw error;
    }
};

export const POST = async(request) => {
    const {user_email} = await request.json()

    let { data: rows, error } = await supabase
    .from('residents')
    .select('*')
    .eq('user_email',user_email)

    const data = await fetchImages(rows)
    const responseBody = JSON.stringify(data);

        // Return response with rows data
    return new Response(responseBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}