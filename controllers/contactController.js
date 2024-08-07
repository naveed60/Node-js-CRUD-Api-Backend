// get all contacts
//routes GET /api/contacts
const getContacts = (req, res) => {
 res.status(200).json({message: "Get all contacts"});
};

// get  contact by id
const getContact = (req, res) => {
 res.status(200).json({message: `Get contact for ${req.params.id}`})};
 
// Create contact api
const createContact = (req, res) => {
    console.log("req.body",req.body)
 res.status(200).json({message:"Create contacts"})
};

// Create contact api
const updateContact = ((req, res) => {
 res.status(200).json({message:`Update contact for ${req.params.id}`})
});

// Delete contact api
const deleteContact = ((req, res) => {
 res.status(200).json({message: `Delete contact for ${req.params.id}`})
});

module.exports ={
    getContacts, 
    getContact,
    createContact,
    updateContact,
    deleteContact};



