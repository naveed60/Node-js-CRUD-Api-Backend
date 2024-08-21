// src/pages/HomePage.js
import React from 'react';
import Footer from '../../components/pages/Footer';
import { Container, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" sx={{ flexGrow: 1, py: 8 }}>
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;
