import React from 'react';
import { Tabs, Tab, styled } from '@mui/material';

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: '#000',
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(15),
  fontFamily: 'Open Sans',
  marginRight: theme.spacing(4),
  '&:hover': {
    color: '#8271EB',
    backgroundColor: 'transparent',
    opacity: 1,
  },
  '&.Mui-selected': { // Updated selector for selected state
    color: '#8271EB',
    fontWeight: 600,
  },
  '&:focus': {
    color: '#8271EB',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTabs-indicator': {
    backgroundColor: '#8271EB',
  },
}));

function CustomTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      aria-label="Admission Tabs"
    >
      <StyledTab label="Admission Tasks" />
      {/* <StyledTab label="Item Two" />
      <StyledTab label="Item Three" /> */}
    </StyledTabs>
  );
}

export default CustomTabs;