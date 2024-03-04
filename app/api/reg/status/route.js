import supabase from '/utils/supabase';

export const POST = async (request) => {
    try {
        const { id } = await request.json();

        // Fetch the row with the given ID from the 'processed-regulations' table
        const { data: existingRow, error } = await supabase
            .from('processed-regulations')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        if (!existingRow) {
            return new Response('Row not found', { status: 404 });
        }

        // Update the 'status' column to its inverse value
        const updatedStatus = !existingRow.status;

        // Update the row in the table with the new status
        const { data: updatedRow, error: updateError } = await supabase
            .from('processed-regulations')
            .update({ status: updatedStatus })
            .eq('id', id)
            .single();

        if (updateError) {
            throw updateError;
        }

        return new Response(JSON.stringify(updatedRow), { status: 200 });
    } catch (error) {
        console.error('Error updating status:', error.message);
        return new Response('Error updating status', { status: 500 });
    }
};