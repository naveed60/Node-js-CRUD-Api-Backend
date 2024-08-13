const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors")

connectDb();
 const app = express();

 const port = process.env.PORT || 2000;

 app.use(express.json());
 app.use("/api/contacts", require("./routes/contactRoutes"));
 app.use("/api/users", require("./routes/userRoutes"));
 app.get('/api/test', (req, res) => {
   res.json({ message: 'API is working' });
 });
 
// In your backend server file
app.use(cors());

 app.use(errorHandler);

 app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
 });