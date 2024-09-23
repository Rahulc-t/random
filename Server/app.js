const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv');

// Load environment variables
// dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
 const userRouter = require('./routes/UserRoutes');
 const adminRouter = require('./routes/AdminRoutes');
const authRouter=require("./routes/AuthRoutes")

// Middleware
app.use(cors({ 
  origin: "http://localhost:5173",
}));
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use("/auth",authRouter)

// Connect to MongoDB using environment variable
mongoose.connect("mongodb://localhost:27017/steam_clone3")
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.log("Failed to connect to database", err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});