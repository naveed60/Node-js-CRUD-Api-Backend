const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        require: [true,"Please add contact Name"],
    },
    email: {
        type: String,
        require: [true,"Please add Email address"],
    },
    phone: {
        type: String,
        require: [true,"Please add Phone number"],
    },
},{
   timestamps: true,    

});

module.exports = mongoose.model("Contact",contactSchema);