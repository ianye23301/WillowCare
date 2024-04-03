import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Handle POST requests
export const POST = async (req) => {
    try {
        const inputData = await req.json();
        // console.log('Received JSON:', inputData);

        // Assuming 'LIC625.pdf' is located in the 'public' directory
        const pdfPath = path.resolve('./public', 'LIC625.pdf');
        const formPdfBytes = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(formPdfBytes);

        // Access and fill the form in the PDF with data from your JSON
        // Example: form.getTextField('CLIENT’S/RESIDENT’S NAME').setText(inputData.clientName);


        const form = pdfDoc.getForm();

        // socialization
        form.getTextField('Socialization _ Needs. DESCRIBE DIFFICULTY IN ADJUSTING SOCIALLY AND UNABLE TO MAINTAIN REASONABLE PERSONAL RELATIONSHIPS').setText(inputData.servicePlan.social.needs);
        form.getTextField('Socialization _ Person responsible for implementation').setText(inputData.servicePlan.social.responsible);
        form.getTextField('Socialization _ Describe Objective/Plan').setText(inputData.servicePlan.social.objective);
        form.getTextField('Socialization_Describe Time Frame').setText(inputData.servicePlan.social.time);
        form.getTextField('Describe here method of evaluating progress').setText(inputData.servicePlan.social.method);

        // emotional
        form.getTextField('Describe here difficulty in adjusting emotionally').setText(inputData.servicePlan.emotional.needs);
        form.getTextField('Describe the Emotion _ Objective_plan').setText(inputData.servicePlan.emotional.objective);
        form.getTextField('Provide Emotion_TimeFrame').setText(inputData.servicePlan.emotional.time);
        form.getTextField('Name the person responsible for implementation').setText(inputData.servicePlan.emotional.responsible);
        form.getTextField('Describe here the Emotion _ method of evaluating progress').setText(inputData.servicePlan.emotional.method);

        // mental
        form.getTextField('Describe mental_needs').setText(inputData.servicePlan.mental.needs);
        form.getTextField('Describe here the mental_objective_plan').setText(inputData.servicePlan.mental.objective);
        form.getTextField('Provide a mental_timeframe').setText(inputData.servicePlan.mental.time);
        form.getTextField('Provide the names of the mental_person responsible for implementation').setText(inputData.servicePlan.mental.responsible);
        form.getTextField('Describe here the mental_method of evaluating progress').setText(inputData.servicePlan.mental.method);

        // physical
        form.getTextField('describe client/residents physical_health_needs, such as difficulties with physical development and poor health habits regarding body functions').setText(inputData.servicePlan.physical.needs);
        form.getTextField('describe the physical_health_objective plan').setText(inputData.servicePlan.physical.objective);
        form.getTextField('provide the physical_health_timeframe').setText(inputData.servicePlan.physical.time);
        form.getTextField('Provide the name of the person(s) responsible for implementation').setText(inputData.servicePlan.physical.responsible);
        form.getTextField('describe the physical_health_method of evalting progress').setText(inputData.servicePlan.physical.method);

        // functioning
        form.getTextField('describe difficulty in developing and/or using independent  functioning skills_needs').setText(inputData.servicePlan.functioning.needs);
        form.getTextField('describe the functioning skills_objecitve_plan').setText(inputData.servicePlan.functioning.objective);
        form.getTextField('provide the functioning skills_time frame').setText(inputData.servicePlan.functioning.time);
        form.getTextField('provide name of person(s) responsible for implementation').setText(inputData.servicePlan.functioning.responsible);
        form.getTextField('describe the functioning skills_method of evaluating progress').setText(inputData.servicePlan.functioning.method);

        // top background info
        form.getTextField('CLIENTSRESIDENTS NAME').setText(inputData.residentInfo.clientName);
        form.getTextField('AGE').setText(inputData.residentInfo.age);
        form.getTextField('FACILITY NAME').setText(inputData.facilityInfo.facilityName);
        form.getTextField('FACILITY LICENSE NUMBER').setText(inputData.facilityInfo.licence);
        form.getTextField('DATE OF BIRTH').setText(inputData.residentInfo.dob);
        form.getTextField('DATE_4').setText(inputData.residentInfo.date);
        if (inputData.residentInfo.sex.toLowerCase() == "male") {
            form.getCheckBox('Male').check();
        } else if (inputData.residentInfo.sex.toLowerCase() == "female") {
            form.getCheckBox('Female').check();
        }
        form.getTextField('DATE COMPLETING THIS FORM').setText(inputData.residentInfo.date);
        form.getTextField('FACILITY ADDRESS').setText(inputData.facilityInfo.address);
        if (inputData.facilityInfo.checkType == "update") {
            form.getCheckBox('TYPE OF NEEDS AND SERVICES PLAN- CHECK BOX FOR UPDATE').check();
        } else {
            form.getCheckBox('CHECK TYPE OF NEEDS AND SERVICES PLAN- CHECK BOX FOR ADMISSION').check();
        }
        form.getTextField('FACILITY NUMBER AREA CODE').setText(inputData.facilityInfo.phone.slice(0, 3));
        form.getTextField('FACILITY TELEPHONE NUMBER').setText(inputData.facilityInfo.phone.slice(-7));
        form.getTextField("FORM FIELD TO PROVIDE A BRIEF DESCRIPTION OF CLIENT'S/RESIDENT'S MEDICAL HISTORY/EMOTIONAL, BEHAVIORAL, AND PHYSICAL PROBLEMS; FUNCTIONAL LIMITATIONS; PHYSICAL AND MENTAL; FUNCTIONAL CAPABILITIES; ABILITY TO HANDLE PERSONAL CASH RESOURCES AND PERFORM SIMPLE HOMEMAKING TASKS; CLIENT'S/RESIDENT'S LIKES AND DISLIKES").setText(inputData.residentInfo.backgroundInformation);
        form.getTextField('NAME OF PERSONS OR AGENCY REFERRING CLIENT/RESIDENT FOR PLACEMENT').setText(inputData.facilityInfo.referral);

        // console.log(inputData.servicePlan.social.needs);
        // Log the names of all form fields (and optionally their values if filled)
        const fields = form.getFields();
        fields.forEach(field => {
            console.log(`Field name: ${field.getName()}`);
            // If you want to log values for fields that can have values, you may need to check the field type
            // and call the appropriate method, e.g., field.getText() for text fields
            // Note: Not all field types will have a method to get their value directly
        });

        // Serialize the PDFDocument to bytes
        const pdfBytes = await pdfDoc.save();

        // Define a path where to save the modified PDF
        // const outputPdfPath = path.resolve('./public', 'modified-LIC625.pdf');
        // fs.writeFileSync(outputPdfPath, pdfBytes);
        // console.log('PDF generated and saved to:', outputPdfPath);

        return new Response(pdfBytes);

        // Instead of sending the PDF directly to the client,
        // you might log a message, return a path, or handle as needed

        // You might want to return a URL or a success message here
    } catch (error) {
        // Handle any errors that occur during PDF generation
        console.error('Error generating PDF:', error);
        return new Response("js");
        // Error handling needs to be adjusted since `res` is not used
    }
};

