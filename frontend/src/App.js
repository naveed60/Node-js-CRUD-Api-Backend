// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ContactProvider } from "./contexts/ContactContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ContactList from "./components/Contacts/ContactList";
import ContactForm from "./components/Contacts/ContactForm";
import ContactDetail from "./components/Contacts/ContactDetail";

function App() {
  return (
    <AuthProvider>
      <ContactProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/contacts/new" element={<ContactForm />} />
            <Route path="/contacts/:id" element={<ContactDetail />} />
          </Routes>
        </Router>
      </ContactProvider>
    </AuthProvider>
  );
}

export default App;
