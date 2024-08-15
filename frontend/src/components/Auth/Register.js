import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
    component={Paper}
    sx={{
      mt: 8,
      p: 4,
      width: "30%",
      height:"auto",
      maxWidth: "350px", // Adjust this value to decrease the width
      borderRadius: "16px",
      boxShadow: 3,
    }}
  >
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="space-around">
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              type="submit"
              size="medium"
              sx={{ borderRadius: "8px" }}
            >
              Sign Up
            </Button>
            <Button
              onClick={handleLoginClick}
              variant="outlined"
              color="secondary"
              size="medium"
              sx={{ borderRadius: "8px" }}
            >
              Login
            </Button>
          </Box>
        </form>
        </Container>
  );
};

export default Register;
