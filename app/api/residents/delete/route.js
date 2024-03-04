import supabase from '/utils/supabase';


export const POST = async(request) => {
    const {residentId} = await request.json()

    try {
      // Delete all rows from the table
      const { data, error } = await supabase.from('residents').delete().eq("id", residentId)
      ;
      if (error) {
        console.error('Error deleting user:', error);
      } else {
        console.log('User deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting user', error.message);
    }

    return new Response();
  };