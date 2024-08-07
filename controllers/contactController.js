const asyncHandler = require("express-async-handler");

// get all contacts
//routes GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
});

// get contact by id
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

// Create contact api
const createContact = asyncHandler(async (req, res) => {
    console.log("req.body", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(200).json({ message: "Create contacts" });
});

// Update contact api
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

// Delete contact api
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
