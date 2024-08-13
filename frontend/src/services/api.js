// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3300/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.get('/test').then(response => console.log(response)).catch(error => console.error(error));

export const registerUser = (userData) => api.post("/register", userData);
console.log("registerUser",registerUser)
export const loginUser = (userData) => api.post("/login", userData);
export const getCurrentUser = (token) =>
  api.get("/current", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getContacts = (token) =>
  api.get("/contacts", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getContactById = (id, token) =>
  api.get(`/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createContact = (contactData, token) =>
  api.post("/contacts", contactData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateContact = (id, contactData, token) =>
  api.put(`/contacts/${id}`, contactData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteContact = (id, token) =>
  api.delete(`/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
