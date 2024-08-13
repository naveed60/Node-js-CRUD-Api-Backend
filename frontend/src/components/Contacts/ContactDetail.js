// src/components/Contacts/ContactDetail.js
import React, { useState, useEffect, useContext } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getContactById, deleteContact } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { ContactContext } from "../../contexts/ContactContext";

const ContactDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { contacts, setContacts } = useContext(ContactContext);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getContactById(id, user.token)
      .then(response => setContact(response.data))
      .catch(error => console.error("Failed to fetch contact", error));
  }, [id, user.token]);

  const handleDelete = async () => {
    try {
      await deleteContact(id, user.token);
      setContacts(contacts.filter(contact => contact._id !== id));
      navigate("/contacts");
    } catch (error) {
      console.error("Failed to delete contact", error);
    }
  };

  if (!contact) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Contact Details</Typography>
      <Typography variant="h6">Name: {contact.name}</Typography>
      <Typography variant="h6">Email: {contact.email}</Typography>
      <Typography variant="h6">Phone: {contact.phone}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => navigate(`/contacts/${id}/edit`)}>
          Edit Contact
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: 10 }}>
          Delete Contact
        </Button>
      </Box>
    </Container>
  );
};

export default ContactDetail;
