// src/components/AppBar.js
import React from 'react';
import { AppBar as MUIAppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AppBar = () => {
  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Button color="inherit" component={Link} to="/home">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        {/* Add more buttons or links as needed */}
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
