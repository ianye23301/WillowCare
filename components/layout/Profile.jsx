import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Stack,
  Modal,
  Button,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import supabase from "@/utils/supabase";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Profile() {
  // You can pass the user name, role, and organization as props or fetch from a user state.
  const userName = "Stephen A. Smith";
  const role = "Admin";
  const organization = "Kimochi SM";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const signOut = async () => {
  //   console.log("Signing out!")
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.error('Error signing out:', error);
  //   }
  //   handleClose();
  // };

  return (
    <Stack direction="row" sx={{ maxHeight: 40, gap: "12px" }}>
      {" "}
      {/* This spacing is 12 pixels. 3 * 4 (default) */}
      <Avatar sx={{ width: 40, height: 40 }} />
      {/* Vertical name stack */}
      <Stack direction="column">
        <Typography
          sx={{
            color: "#F4F2EE",
            fontWeight: "bold",
            fontSize: "14px",
            fontFamily: "Open Sans",
            whiteSpace: "nowrap",
          }}
        >
          Stephen A. Smith
        </Typography>
        <Typography
          sx={{
            color: "#F4F2EE",
            fontSize: "14px",
            fontFamily: "Open Sans",
            whiteSpace: "nowrap",
          }}
        >
          {role} · {organization}
        </Typography>
      </Stack>
      {/* Drop down for logging out */}
      <IconButton onClick={handleClick} sx={{ color: "#F4F2EE" }}>
        <ArrowDropDownIcon
          sx={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </IconButton>
      {/* Whenever the user clicks the arrow drop down icon */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={signOut}>
          <ExitToAppIcon sx={{ marginRight: "10px", fontSize: "small" }} />
          <Typography sx={{ fontSize: "0.875rem" }}>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Stack>
  );
}
