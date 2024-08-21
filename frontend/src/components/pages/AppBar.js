import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function ButtonAppBar() {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout(); // Log out the user
      navigate('/login'); // Redirect to login page after logging out
    } else {
      navigate('/login'); // Redirect to login page if not logged in
    }
  };

  const handleAboutNavigation = () => {
    navigate('/about'); // Navigate to the About page
  };

  const handleMyContactsNavigation = () => {
    if (user) {
      navigate('/contacts'); // Navigate to the Contacts page if the user is logged in
    } else {
      alert('Please log in to view your contact list.'); // Show an alert if the user is not logged in
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" onClick={handleMyContactsNavigation} variant="h6" component="div">
            My Contacts
          </Button>
          <Button color="inherit" onClick={handleAboutNavigation}>
            About
          </Button>
          <Button color="inherit" onClick={handleAuthAction}>
            {user ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
