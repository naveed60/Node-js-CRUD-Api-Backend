// src/contexts/ContactContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { getContacts } from "../services/api"; // Adjust the path as necessary
import api from "../services/api"; // Make sure this is correctly set up
import { AuthContext } from "./AuthContext";


// Create the context
export const ContactContext = createContext();

// Create a provider component
export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);


  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (err) {
      setError("Failed to fetch contacts");
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [contacts]);

  // Function to delete a contact
  const deleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      // Update contacts state after deletion
      setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== id));
    } catch (err) {
      setError("Failed to delete contact");
      console.error("Error deleting contact:", err);
    }
  };

  return (
    <ContactContext.Provider value={{ contacts,setContacts, deleteContact, loading, error }}>
      {children}
    </ContactContext.Provider>
  );
};
