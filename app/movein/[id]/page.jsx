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
import CustomTabs from "./CustomTabs";


const page = ({ params }) => {
  // Temporary tasks
  const tasks = [
    {
      id: 1,
      title: "Identification and Emergency Information (LIC 601)",
      status: "Not Started",
      sharedWith: "Shared with Primary Contact • 2 minutes ago",
      statusColor: "warning",
    },
    {
      id: 2,
      title: "Release of Residents Medical Information (LIC 605A)",
      status: "Completed",
      sharedWith: "Shared with Primary Contact • 2 minutes ago",
      statusColor: "success",
    },
    // ... Add other tasks
  ];

  const { id } = params;

  const handleChange = () => {
    console.log("HandleChange");
  };
  return (
    <div className="h-screen overflow-y-auto flex flex-col">

      <Stack spacing={2}>

        {/* Top Tab Box (containing all tabs) */}
        <Box sx={{ width: "100%", boxShadow: "none", bgcolor: "white" }}>
          <CustomTabs/>
        </Box>

        <Stack direction="column" sx={{ p: "16px 32px 16px 32px", maxWidth: "100%" }}>

        <Typography sx={{ fontFamily: 'Open Sans', fontSize: 14, color: '#828282', fontWeight: 'regular' }}>Admissions {'>'} Jefferey Liu </Typography>

        <Box sx = {{height: 12}}/>

          {/* Contains the User Card (all information) */}
          <UserCard />

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
            {tasks.map((task) => (
              <Paper
                key={task.id}
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography variant="subtitle1">{task.title}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {task.sharedWith}
                  </Typography>
                </div>
                <Button variant="contained" color={task.statusColor}>
                  {task.status}
                </Button>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default page;
