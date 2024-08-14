// src/components/Auth/Login.js
import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Ensure this path is correct
import { loginUser } from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext); // Ensure setUser is provided in AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const { accessToken, ...userData } = response.data; // Destructure to separate accessToken from other user data
      console.log("userData",userData)
      localStorage.setItem("accessToken", accessToken); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
      console.log("accessToken",accessToken)

      setUser(userData); // Update context state with user data
      navigate("/contacts"); // Redirect to contacts page
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
