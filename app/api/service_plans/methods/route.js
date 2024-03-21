import supabase from '/utils/supabase';
import OpenAI from 'openai';

function gpt(system_input, user_input, model, response_format) {
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
    const response = openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: system_input,
            },
            {
                role: "user",
                content: user_input
            }
        ],
        model: model,
        response_format: response_format,
    });
    return response;
}

export const POST = async (request) => {
    try {
        const { text, plan, userAddOns, category } = await request.json();
        const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
        const prompt = text
        const extra_info = userAddOns

        if (prompt == "") {
            return new Response('Error: prompt is empty', { status: 400 });
        }

        // const response = await gpt("Please return an array of JSON objects only. I will give you an input of regulations that senior care homes need to follow.", `Please parse the following text into an array with the key "regulations" of JSON objects for each identified regulation. Each JSON object has fields Regulation Name (keep this very simple), Regulation Content (please fill out a short description), Frequency (integer, always set to 0 if not explicitly given), Tag (choose strictly between 'Licensing & Documentation', 'Care & Facilities', or 'Management'), Per-Resident (determine whether or not this needs to be done for each resident and store a boolean, anything resident related should be true) and Status (always set to boolean false), Check_Frequency (string explaining how often this task should be done or checked), Requirements (string with everything that must be done to satisfy this regulation): ${prompt}`, "gpt-3.5-turbo", { type: "json_object" });

        const cat = category; // Define the category variable

        const service_plan_system_input = `
        You will be working with a document which is a template from the State of California—Health and Human Services Agency, specifically the California Department of Social Services, Community Care Licensing division. The document is an 'Appraisal/Needs and Services Plan' used to evaluate the needs of clients or residents within community care facilities and develop a comprehensive service plan to address those needs. It covers areas such as socialization, emotional and mental health, physical health, and functioning skills. The document also includes sections for documenting background information about the client or resident, objectives and plans for meeting their needs, responsible persons for implementation, and methods for evaluating progress.
        
        Given this need and plan relating to the ${cat} category, 
        give me 3 potential methods of evaluating progress
        Consider and be specific to: ${extra_info}

        Return as JSON like so:
          "Methods": [
            {
              "Method": 1 sentence description of the Method,
            },
            {
              "Method": 1 sentence description of the Method,
            },
            {
              "Method": 1 sentence description of the Method,
            }
          ]
        `.trim(); // Use .trim() to remove any leading or trailing newlines

        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: service_plan_system_input,
                },
                {
                    role: "user",
                    content: prompt,
                }
            ],
            model: "gpt-4-turbo-preview",
            response_format: { type: "json_object" },
        });
        console.log(response.choices[0].message.content)
        return new Response(response.choices[0].message.content);

        // if (prompt) { // Check if prompt is not empty

        //     const res = response.choices[0].message.content; // Use res instead of content
        //     const regs = JSON.parse(res)
        //     const array = regs.regulations

        //     try {
        //         await clearTable(supabase, user_email)
        //         await Promise.all(array.map(async (reg) => {
        //             await supabase.from('processed-regulations').insert({ rn: reg["Regulation Name"], rc: reg["Regulation Content"], fq: reg["Frequency"], cat: reg["Tag"], user_email: user_email, status: reg["Status"], pr: reg["Per-Resident"], check_frequency: reg["Check_Frequency"], requirements: reg["Requirements"] }); // Insert the regulation object
        //         }));
        //         console.log("data stored to DB")
        //         return new Response(res);
        //     } catch (error) {
        //         console.error('Error storing data to Supabase:', error);
        //         return new Response('Error storing data to Supabase', { status: 500 });
        //     }
        // } else {
        //     await clearTable(supabase, user_email)
        //     return new Response() // Return bad request status if prompt is empty
        // }
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