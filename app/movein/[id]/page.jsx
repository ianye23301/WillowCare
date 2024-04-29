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
          <UserCard sx />

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
