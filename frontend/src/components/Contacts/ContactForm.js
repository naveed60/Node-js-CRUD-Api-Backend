// src/components/Contacts/ContactForm.js
import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../../contexts/ContactContext";
import { createContact, updateContact, getContactById } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { contacts, setContacts } = useContext(ContactContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      // Fetch contact data for editing
      getContactById(id, user.token).then(response => {
        const { name, email, phone } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
      }).catch(error => console.error("Failed to fetch contact", error));
    }
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update contact
        const response = await updateContact(id, { name, email, phone }, user.token);
        setContacts(contacts.map(contact => (contact._id === id ? response.data : contact)));
      } else {
        // Create new contact
        const response = await createContact({ name, email, phone }, user.token);
        setContacts([...contacts, response.data]);
      }
      navigate("/contacts");
    } catch (error) {
      console.error("Failed to save contact", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{id ? "Edit Contact" : "Add Contact"}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Phone"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          {id ? "Update Contact" : "Add Contact"}
        </Button>
      </form>
    </Container>
  );
};

export default ContactForm;
