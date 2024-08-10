const express = require("express");
const router = express.Router();
const {
    getContacts, 
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// Apply validateToken middleware to all routes
router.route("/").get(validateToken, getContacts).post(validateToken, createContact);
router.route("/:id").get(validateToken, getContact).put(validateToken, updateContact).delete(validateToken, deleteContact);

module.exports = router;
