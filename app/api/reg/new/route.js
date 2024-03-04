import supabase from '/utils/supabase';
import OpenAI from 'openai';


export const POST = async (request) => {
  try {
    const {text,user_email} = await request.json();
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
    const prompt = text

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Please return an array of JSON objects only. I will give you an input of regulations that senior care homes need to follow.",
        },
        {
          role: "user",
          content: `Please parse the following text into an array with the key "regulations" of JSON objects for each identified regulation. Each JSON object has fields Regulation Name (keep this very simple), Regulation Content (please fill out a short description), Frequency (integer, always set to 0 if not explicitly given), Tag (choose strictly between 'Licensing & Documentation', 'Care & Facilities', or 'Management'), Per-Resident (determine whether or not this needs to be done for each resident and store a boolean, anything resident related should be true) and Status (always set to boolean false): ${prompt}`
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    if (prompt) { // Check if prompt is not empty

      const res = response.choices[0].message.content; // Use res instead of content
      const regs = JSON.parse(res)
      const array = regs.regulations

      try {
        await clearTable(supabase, user_email)
        await Promise.all(array.map(async (reg) => {
              await supabase.from('processed-regulations').insert({rn: reg["Regulation Name"], rc: reg["Regulation Content"], fq: reg["Frequency"], cat: reg["Tag"], user_email: user_email, status: reg["Status"], pr: reg["Per-Resident"]}); // Insert the regulation object
      }));
        console.log("data stored to DB")
        return new Response(res);
      } catch (error) {
        console.error('Error storing data to Supabase:', error);
        return new Response('Error storing data to Supabase', { status: 500 });
      }
    } else {
      await clearTable(supabase,user_email)
      return new Response() // Return bad request status if prompt is empty
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}


const clearTable = async (supabase, email) => {
  try {
    // Delete all rows from the table
    const { data, error } = await supabase.from('processed-regulations').delete().eq("user_email", email)
    ;
    if (error) {
      console.error('Error clearing table:', error);
    } else {
      console.log('Table cleared successfully');
    }
  } catch (error) {
    console.error('Error clearing table:', error.message);
  }
};