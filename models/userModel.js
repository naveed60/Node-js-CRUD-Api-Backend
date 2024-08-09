const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true,"Please add user Name"],
    },
    email: {
        type: String,
        require: [true,"Please add Email address"],
        unique: [true, "Email address already existed"]
    },
    password: {
        type: String,
        require: [true,"Please add user Password"],
    },
},{
   timestamps: true,    

});

module.exports = mongoose.model("User", userSchema);