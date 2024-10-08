// src/components/Auth/Login.js
import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Ensure this path is correct
import { loginUser } from "../../services/api";
import {  useParams } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password , id});
      const { accessToken, userData } = response.data; // Destructure to separate accessToken from other user data
      console.log("userData", userData); // Log the full response data      console.log("data",data)
      localStorage.setItem("accessToken", accessToken); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
      // setUser(user); // Update context state with user data
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