"use client";
import { useRouter } from "next/router";
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import ViewerComponent from "/components/ViewerComponent";


const page = ({ params }) => {
  console.log(params)
  // Temporary tasks
  const formatLastUpdated = (timestamp) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
    if (diffInSeconds < 60) {
      return diffInSeconds + " seconds ago";
    } else if (diffInSeconds < 3600) {
      return Math.floor(diffInSeconds / 60) + " minutes ago";
    } else if (diffInSeconds < 86400) {
      return Math.floor(diffInSeconds / 3600) + " hours ago";
    } else if (diffInSeconds < 604800) {
      return Math.floor(diffInSeconds / 86400) + " days ago";
    } else if (diffInSeconds < 2592000) {
      return Math.floor(diffInSeconds / 604800) + " weeks ago";
    } else if (diffInSeconds < 31536000) {
      return Math.floor(diffInSeconds / 2592000) + " months ago";
    } else {
      return Math.floor(diffInSeconds / 31536000) + " years ago";
    }
  };


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

  const handleChange = () => {
    console.log("HandleChange");
  };


  function getLIC(str) {
    const index = str.indexOf('.');
    if (index !== -1) {
      return str.substring(0, index).toUpperCase();
    }
    return str;
  }
  const [pdf, setpdf] = useState(null)
  const handleViewPdf = (path) => {
    setpdf(path)
  }
  const closePdf = () => {
    setpdf(null)
  }



  return (
    info && (

      pdf ? (
        <div className="App">
          <div className="PDF-viewer">
            <ViewerComponent document={pdf} onClose = {closePdf} id = {id} name = {getLIC(pdf)}/>
          </div>
        </div> ) : (
    <div className="h-screen overflow-y-auto flex flex-col">
      {/* Header */}

      <Stack spacing={2}>
        <Box sx={{ width: "100%", boxShadow: "none", bgcolor: "white" }}>
          <Tabs
            value={"Hello"}
            onChange={handleChange}
            textColor=""
            indicatorColor="white"
            aria-label="secondary tabs example"
            sx={{
              ".MuiTab-root": {
                color: "black", // Sets the text color to black
                fontWeight: "bold", // Makes the text bold
                textTransform: "none",
                "& button:focus": { backgroundColor: "secondary" },
              },
            }}
          >
            <Tab value="one" label="Admission Tasks" />
          </Tabs>
        </Box>

        <Stack
          direction="column"
          sx={{ p: "16px 32px 16px 32px", maxWidth: "100%" }}
          spacing={1}
        >
          <UserCard name={info.name} date={info.target_date} contact={info.contact} update = {info.last_updated} sx/>

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
            {forms.map((form, index) => (
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
                  <Typography variant="subtitle1">{form.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                  Shared with Primary Contact · {formatLastUpdated(info.input_time)}
                  </Typography>
                </div>
                <div className="label flex flex-row p-2 rounded-lg borders shadow-custom cursor-pointer" onClick={()=>(handleViewPdf(form.path))}>
                    <img src="/assets/icons/view.svg" className="w-6 h-6"/>
                    <div className="ml-2">View</div>
                </div>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </div>))
  );
};

export default page;
