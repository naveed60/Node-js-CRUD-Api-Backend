// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3600/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => api.post("users/register", userData);
export const loginUser = (userData) => api.post("users/login", userData);
export const getCurrentUser = () => api.get("/current");
export const getContacts = () => api.get("/contacts");
export const getContactById = (id) => api.get(`/contacts/${id}`);
export const createContact = (contactData) => api.post("/contacts", contactData);
export const updateContact = (id, contactData) => api.put(`/contacts/${id}`, contactData);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

export default api;
