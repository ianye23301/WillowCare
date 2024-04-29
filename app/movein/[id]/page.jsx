"use client";
import ViewerComponent from "/components/ViewerComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "./UserCard";
import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  LinearProgress,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import CustomTabs from "./CustomTabs";
import { InfoSharp } from "@mui/icons-material";


const page = ({ params }) => {

  const router = useRouter()
  
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


  const { id } = params;
  const [info, setInfo] = useState(null)
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

  const [pdf, setpdf] = useState(null)

  const handleViewPdf = (path) => {
      setpdf(path)
  }

  const closePdf = () => {
      setpdf(null)
  }

  const handleChange = () => {
    console.log("HandleChange");
  };


  const formatLastUpdated = (timestamp) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
    if (diffInSeconds < 60) {
      return diffInSeconds + " seconds";
    } else if (diffInSeconds < 3600) {
      return Math.floor(diffInSeconds / 60) + " minutes";
    } else if (diffInSeconds < 86400) {
      return Math.floor(diffInSeconds / 3600) + " hours";
    } else if (diffInSeconds < 604800) {
      return Math.floor(diffInSeconds / 86400) + " days";
    } else if (diffInSeconds < 2592000) {
      return Math.floor(diffInSeconds / 604800) + " weeks";
    } else if (diffInSeconds < 31536000) {
      return Math.floor(diffInSeconds / 2592000) + " months";
    } else {
      return Math.floor(diffInSeconds / 31536000) + " years";
    }
  };
  



  return (
    pdf ? (
    <div className="App">
      <div className="PDF-viewer">
        <ViewerComponent document={pdf} onClose = {closePdf} id = {id} name = {getLIC(pdf)} editor = "Me"/>
      </div>
    </div>) : (
    info && (
    <div className="h-screen overflow-y-auto flex flex-col">

      <Stack spacing={2}>

        {/* Top Tab Box (containing all tabs) */}
        <Box sx={{ width: "100%", boxShadow: "none", bgcolor: "white" }}>
          <CustomTabs/>
        </Box>

        <Stack direction="column" sx={{ p: "16px 32px 16px 32px", maxWidth: "100%" }}>

        <Typography sx={{ fontFamily: 'Open Sans', fontSize: 14, color: '#828282', fontWeight: 'regular' }} className="flex flex-row"><div className="cursor-pointer hover:underline pr-1" onClick={()=>{router.push('/movein')}}>Admissions </div> {' >'} {info.name} </Typography>

        <Box sx = {{height: 12}}/>

          {/* Contains the User Card (all information) */}
          <UserCard sx name = {info.name} date = {info.target_date} contact = {info.contact} update = {info.last_updated} input_time = {info.input_time} editor = {info.editor} forms = {info.forms} id = {id}/>

          {/* This is spacing */}
          <Box sx={{ height: 16 }} />

          <Typography variant="h6" sx={{ color: "black" }}>
            {" "}
            Tasks{" "}
          </Typography>
          <Divider sx={{ borderColor: "#E0E4E7", width: "100%" }} />

          {/* This is spacing */}
          <Box sx={{ height: 16 }} />

          {/* Task mapping */}
          <Stack spacing={2} sx={{ width: "100%" }}>

            
          {forms.sort((a, b) => {
    // Sorting logic remains the same
}).map((form, index) => (
    <Paper
        key={index}
        elevation={2}
        sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}
    >
        <div>
            <Typography variant="subtitle1">{form.name} ({form.lic})</Typography>
            <Typography variant="caption" color="textSecondary">
                Shared with Family · {formatLastUpdated(info.input_time)} ago
            </Typography>
        </div>
        <div className="flex items-center justify-center">
            <div className="p-1 text-center mr-10">
                {info.forms[form.lic] ? (
                    <div className="complete p-2 px-3 rounded-lg ">Complete</div>
                ) : (
                    <div className="not-started p-2 px-3 rounded-lg ">Incomplete</div>
                )}
            </div>
            <div className="label flex flex-row p-2 rounded-lg borders shadow-custom cursor-pointer" onClick={() => (handleViewPdf(form.path))}>
                <img src="/assets/icons/view.svg" className="w-6 h-6" />
                <div className="ml-2">View</div>
            </div>
        </div>
    </Paper>
))}
          </Stack>
        </Stack>
      </Stack>
    </div>)
    )
);
};

export default page;
