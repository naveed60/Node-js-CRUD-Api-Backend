// src/components/Contacts/ContactDetail.js
import React, { useState, useEffect, useContext } from "react";
import { Container, Typography, Button, Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getContactById } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

const ContactDetail = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContactById(id, user.token);
        setContact(response.data);
      } catch (error) {
        setError("Failed to fetch contact details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, user.token]);

  if (loading) {
    return (
      <Container sx={{ mt: 8 }} align="center">
        <CircularProgress />
        <Typography>Loading contact details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8 }} align="center">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Contact Details</Typography>
      {contact && (
        <Box>
          <Typography variant="h6">Name: {contact.name}</Typography>
          <Typography variant="h6">Email: {contact.email}</Typography>
          <Typography variant="h6">Phone: {contact.phone}</Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/contacts/${contact._id}/edit`)}>
              Edit Contact
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ContactDetail;
