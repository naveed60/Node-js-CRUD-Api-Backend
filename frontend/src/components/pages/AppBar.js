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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Contacts
          </Typography>
          <Button color="inherit" onClick={handleAuthAction}>
            {user ? 'Logout' : 'Login'} {/* Show "Login" or "Logout" based on the user's state */}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
