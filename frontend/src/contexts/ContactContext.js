// src/contexts/ContactContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { getContacts } from "../services/api";
import { AuthContext } from "./AuthContext";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getContacts(user.token).then((response) => setContacts(response.data));
    }
  }, [user]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
