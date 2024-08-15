const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register users
//routes GET /api/register/users
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const currentUser = await User.findOne({ email });
  if (currentUser) {
    res.status(400);
    throw new Error("User Already existed");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);

  if (user) {
    // Send a response and return to avoid further execution
    return res.status(201).json({ _id: user.id, email: user.email });
  } else {
    throw new Error("User data not valid");
  }
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
    {expiresIn:"24h"}
  );
   console.log("login user",user);
    res.status(200).json({accessToken})
   }else {
    res.status(401);
    throw new Error("email or password not valid");
   }
});

const currentUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    });
  } else {
    res.status(401).json({ message: "Not authorized, no user found" });
  }
});

module.exports = {registerUser,loginUser,currentUser};