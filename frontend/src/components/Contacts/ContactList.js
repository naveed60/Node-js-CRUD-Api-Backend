import React, { useContext } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { ContactContext } from "../../contexts/ContactContext";

const ContactList = () => {
  const { contacts, deleteContact, loading, error } = useContext(ContactContext);

  const handleDelete = (id) => {
    deleteContact(id);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8 }} align="center">
        <CircularProgress />
        <Typography>Loading contacts...</Typography>
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
      <Typography variant="h4" gutterBottom>
        Contact List
      </Typography>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact._id} divider>
            <ListItemText primary={contact.name} secondary={contact.email} />
            <Box>
              <Button
                component={Link}
                to={`/contacts/${contact._id}/edit`}
                variant="contained"
                color="info"
                sx={{ mr: 1 }}
              >
                Edit Contact
              </Button>
              <Button
                component={Link}
                to={`/contacts/${contact._id}`}
                variant="contained"
                color="success"
                sx={{ mr: 1 }}
              >
                View Contact
              </Button>
              <Button
                onClick={() => handleDelete(contact._id)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Box>
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
