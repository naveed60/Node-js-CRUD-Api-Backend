const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModel")

// get all contacts
//routes GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  console.log("contacts",contacts)
  res.status(200).json(contacts);
});

// get contact by id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log("contact by id",contact)
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// Create contact api
const createContact = asyncHandler(async (req, res) => {
    console.log("req.body", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
      name,
      email,
      phone
    });
    console.log("contact created",contact);
    res.status(200).json(contact);
});

// Update contact api
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
    res.status(200).json(updatedContact);
});

// Delete contact api
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log("contacts",contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Contact deleted successfully" });
});


module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
