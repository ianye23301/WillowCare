import supabase from '/utils/supabase';

export const POST = async(request) => {

    const {residentInfo, facilityInfo, serviceInfo} = await request.json()


    let { data: rows, error } = await supabase
    .from('service_plan')
    .insert({residentInfo:residentInfo, facilityInfo: facilityInfo, servicePlan: serviceInfo})


        // Return response with rows data
    return new Response()
}