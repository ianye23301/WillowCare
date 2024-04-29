"use client"

import ViewerComponent from "/components/ViewerComponent";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function Portal() {

    function getLIC(str) {
        const index = str.indexOf('.');
        if (index !== -1) {
          return str.substring(0, index);
        }
        return str;
      }
      

    const forms = [
        { name: "Record of Client's/Resident's Safeguarded Cash Resources", path: "LIC405.pdf", lic: "LIC405" },
        { name: "Identification and Emergency Information", path: "lic601.pdf", lic: "LIC601" },
        { name: "Physician's Report for Residential Care Facilities for the Elderly", path: "lic602a.pdf", lic: "LIC602A" },
        { name: "Preplacement Appraisal Information", path: "LIC603.pdf", lic: "LIC603" },
        { name: "Guide to Admission Agreements for Residential Care Facility for the Elderly", path: "LIC604A.pdf", lic: "LIC604A" },
        { name: "Release of Client/Resident Medical Information", path: "LIC605A.pdf", lic: "LIC605A" },
        { name: "Personal Rights for Residential Care Facilities for the Elderly", path: "LIC613C.pdf", lic: "LIC613C" },
        { name: "Client/Resident Personal Property and Valuables", path: "LIC621.pdf", lic: "LIC621" },
        { name: "Appraisal/Needs and Services Plan", path: "LIC625.pdf", lic: "LIC625" },
        { name: "Consent for Emergency Medical Treatment - Adult and Elderly Residential Facilities", path: "LIC627C.pdf", lic: "LIC627C" },
        { name: "Telecommunications Device Notification", path: "LIC9158.pdf", lic: "LIC9158" },
        { name: "Functional Capability Assessment", path: "lic9172.pdf", lic: "LIC9172" }
      ];


    const path = usePathname();
    const inviteIndex = path.indexOf("/invite/");
    const id = path.substring(inviteIndex + "/invite/".length);
    const [info, setInfo] = useState(null)
    const [pdf, setpdf] = useState(null)

    const fetchResident = async() => {
        try {
            const response = await fetch('/api/move_ins/fetch_single', {
                method: 'POST',
                body: JSON.stringify({
                    id: id
                })
              });
            const data = await response.json()
            setInfo(data[0])
        }

        catch (error) {
            console.error(error)
        }
    }

    useEffect(()=> {
        console.log(id)
        fetchResident()
    },[])
    
    const handleViewPdf = (path) => {
        setpdf(path)
    }

    const closePdf = () => {
        setpdf(null)
    }

  return (

    pdf ? (
    <div className="App">
      <div className="PDF-viewer">
        <ViewerComponent document={pdf} onClose = {closePdf} id = {id} name = {getLIC(pdf)}/>
      </div>
    </div>
    ) : (
        info && (
        <div className='overflow-y-auto flex flex-col pb-10'>
            <div className='flex flex-col h-full w-4/6 mt-10 mx-auto'>
                <div className="label">
                    {info.contact.name},
                </div>
                <div className="input-text my-4">
                Welcome to the Joyful Chapter admission portal! Please sign or address all of the incomplete documents by clicking on the action buttons.
                </div>

                {forms.map((form,index) => (
                <div key = {index} className="borders shadow-custom p-4 m-3 flex flex-row">
                    <div className="w-3/5 flex flex-col">
                        <div className="label">{form.name} ({form.lic})</div>
                        {info.date && (
                        <div className="input-text gray-9">Due by {info.date}</div>
                        )}
                    </div>
                    <div className="w-1/5 p-1 text-center">
                        <div className="not-started p-2 px-1 rounded-lg ">Incomplete</div>
                    </div>
                    <div className="p-1 w-1/5 flex justify-center">
                        <div className="label flex flex-row p-2 rounded-lg borders shadow-custom cursor-pointer" onClick={()=>(handleViewPdf(form.path))}>
                            <img src="/assets/icons/view.svg" className="w-6 h-6"/>
                            <div className="ml-2">View</div>
                        </div>
                    </div>

                </div>
            ))}
            </div>
        </div>
    )
    )
    
  );
}

export default Portal;