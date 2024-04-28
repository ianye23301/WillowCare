import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  LinearProgress,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function UserCard() {
  // Calculate the progress percentage
  const totalSteps = 16;
  const currentStep = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ width: 56, height: 56 }} />
        <Box sx={{ ml: 2, flex: '1 1 auto' }}>
          <Typography variant="h6">Jefferey Liu</Typography>
          <Typography color="textSecondary">Primary Contact</Typography>
          <Typography color="textSecondary">Bob Liu - bob@email.com</Typography>
          <Typography color="textSecondary">Target Move-In Date: May 31, 2023</Typography>
          <Typography color="textSecondary">Last Update: 6 hours ago by Family</Typography>
        </Box>
      </Box>
      <Box sx={{ width: '35%', mr: 2 }}>
        <LinearProgress variant="determinate" value={progress} />
        <Typography color="textSecondary">{`Step ${currentStep} of ${totalSteps}`}</Typography>
      </Box>
      <CardActions>
        <Button size="small" startIcon={<EditIcon />}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
