const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register users
//routes GET /api/register/users
const registerUser = asyncHandler(async (req, res) => {
    const {username,email,password} = req.body;
  if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
  }
  const currentUser = await User.findOne({email});
  if (currentUser) {
    res.status(400);
      throw new Error("User Already existed");
  };
  //hashed passwrod
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log("Hashed Password",hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if (user){
    res.status(201).json({_id: user.id, email: user.email})
  } else {
    throw new Error("User data not valid")
  }
  res.json({message:"Register the user"});

});

// Login users
//routes GET /api//users/login
const loginUser = asyncHandler(async (req, res) => {
   const {email, password} = req.body;
   if (!email || !password){
    res.status(400);
    throw new Error("Email and Password Required")
   }
   const  user = await User.findOne({email});
   if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
      user:{
        username: user.username,
        email: user.email,
        id: user.id,
      }
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"15m"}
  );
    res.status(200).json({accessToken})
   }else {
    res.status(401);
    throw new Error("email or password not valid");
   }
});

//  user info
//routes GET /api//users/login
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
    console.log("currentUser",req.user)
});

module.exports = {registerUser,loginUser,currentUser};