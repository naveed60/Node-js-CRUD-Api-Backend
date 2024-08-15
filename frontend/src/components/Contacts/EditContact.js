// src/components/Contacts/EditContact.js
import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getContactById, updateContact } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { ContactContext } from "../../contexts/ContactContext";

const EditContact = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { contacts, setContacts } = useContext(ContactContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getContactById(id, user.token)
      .then(response => setContact(response.data))
      .catch(error => console.error("Failed to fetch contact", error));
  }, [id, user.token]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContact(id, contact, user.token);
      const updatedContacts = contacts.map(c => (c._id === id ? contact : c));
      setContacts(updatedContacts);
      navigate("/contacts");
    } catch (error) {
      console.error("Failed to update contact", error);
    }
  };

  return (
    <Container sx={{ mt: 12 }}>
      <Typography variant="h4" gutterBottom>Edit Contact</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={contact.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="info" type="submit">
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditContact;
