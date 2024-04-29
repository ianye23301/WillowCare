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
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function UserCard(props) {
  // Calculate the progress percentage
  const totalSteps = 16;
  const currentStep = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: "120px",
        ...props.sx
      }}
    >
      <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
        <Avatar sx={{ width: "130px", height: "130px", borderRadius: "0%" }} />

        {/* Vertical Stack for the RHS */}
        <Stack direction="column" sx={{ pt: 2, pb: 1, pr: 2, width: "100%" }}>
          {/* Top horizontal stack */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Jefferey Liu</Typography>
            <Button
              size="small"
              startIcon={<EditIcon />}
              sx={{
                color: "gray",
                borderColor: "gray",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: "16px",
                padding: "10px",
              }}
            >
              <Typography variant="caption">Edit</Typography>
            </Button>
          </Stack>

          {/* Bottom horizontal stack */}
          <Stack direction="row" spacing={6}>
            {/* This is going to be the primary contact information */}
            <Stack direction="column">
              <Typography variant="caption" color="textSecondary">
                Primary Contact
              </Typography>
              <Typography
                color="textPrimary"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                Bob Liu
              </Typography>

              <Typography color="textSecondary" variant="caption">
                353-535-353 - bob@email.com
              </Typography>
            </Stack>

            <Stack direction="column">
              <Typography variant="caption" color="textSecondary">
                Target Move-In Date
              </Typography>
              <Typography color="textPrimary" variant="body2">
                May 31, 2023
              </Typography>
            </Stack>

            {/* Progress */}
            <Stack direction="column">
              <Typography variant="caption" color="textSecondary">
                Progress
              </Typography>
              <Typography color="textPrimary" variant = "caption" sx = {{fontSize: '0.7rem'}}>{`Step ${currentStep} of ${totalSteps}`}</Typography>
              <LinearProgress variant="determinate" value={progress} sx={{ height: '10px', borderRadius: '5px', color: 'purple', minWidth: '140px'}} />

            </Stack>

            {/* Last Update */}
            <Stack direction = "column">
              <Typography variant="caption" color="textSecondary">
                Last Update
              </Typography>
              <Typography variant="caption" color="textPrimary">
                6 hours ago by Family
              </Typography>

            </Stack>


          </Stack>
        </Stack>
      </Stack>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
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
      </CardActions> */}
    </Card>
  );
}
