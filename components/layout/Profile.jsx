import React from 'react';
import { Box, Avatar, Typography, IconButton, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Profile() {
  // You can pass the user name, role, and organization as props or fetch from a user state.
  const userName = 'Stephen A. Smith';
  const role = 'Admin';
  const organization = 'Kimochi SM';

  return (
    <Stack direction = "row" sx = {{maxHeight: 40, gap: '12px'}}> {/* This spacing is 12 pixels. 3 * 4 (default) */ }
        <Avatar sx = {{width: 40, height: 40}}/>

        {/* Vertical name stack */}
        <Stack direction = "column">
            <Typography sx={{ color: '#F4F2EE', fontWeight: 'bold', fontSize: '14px', fontFamily: 'Open Sans', whiteSpace: 'nowrap' }}>Stephen A. Smith</Typography>
            <Typography sx={{ color: '#F4F2EE', fontSize: '14px', fontFamily: 'Open Sans', whiteSpace: 'nowrap'}}>Admin · Kimochi SM</Typography>
        </Stack>

        {/* Drop down for logging out */}
    {/* <IconButton onClick={() => setOpen(!open)} sx={{ color: '#F4F2EE' }}>
      <ArrowDropDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
    </IconButton> */}
    {/* <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sign Out
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to sign out?
        </Typography>
        <Button onClick={signOut} sx={{ mt: 2 }}>Confirm</Button>
      </Box>
    </Modal> */}

    </Stack>
    // <Box
    //   sx={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     color: 'white',
    //     padding: '8px 16px',
    //   }}
    // >
    //   <Avatar sx={{ bgcolor: 'secondary.main', marginRight: '8px' }}>SA</Avatar>
    //   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //     <Typography variant="subtitle1">{userName}</Typography>
    //     <Typography variant="caption">
    //       {role} • {organization}
    //     </Typography>
    //   </Box>
    //   <IconButton sx={{ color: 'white', marginLeft: 'auto' }}>
    //     <ArrowDropDownIcon />
    //   </IconButton>
    // </Box>
  );
}