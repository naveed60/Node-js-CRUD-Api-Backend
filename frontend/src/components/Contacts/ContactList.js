// src/components/Contacts/ContactList.js
import React, { useContext } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ContactContext } from "../../contexts/ContactContext";

const ContactList = () => {
  const { contacts } = useContext(ContactContext);
  console.log("contacts",contacts)

  return (
    <Container sx={{mt:8}}>
      <Typography variant="h4" gutterBottom>Contact List</Typography>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact._id} divider>
            <ListItemText primary={contact.name} secondary={contact.email} />
            <Button component={Link} to={`/contacts/${contact._id}`} variant="contained" color="primary">
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
      <Button component={Link} to="/contacts/new" variant="contained" color="primary">
        Add New Contact
      </Button>
    </Container>
  );
};

export default ContactList;
