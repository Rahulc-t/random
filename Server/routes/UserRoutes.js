const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels.js');
// const Appointment = require('../models/appointmentModel.js');
// const Limit = require('../models/appointmentlimit.js');
// const Review = require('../models/review.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verifyToken = require('../middleware/authMiddle.js');
const path = require('path');
// const multer=require("multer")
const fs=require("fs")
// const multer=require("multer")
// const fs=require("fs")
// const sharp=require("sharp")
// const path=require("path")
const Transaction = require('../models/transactions.js')
const Games =require("../models/gameModel.js")

const router = express.Router();

router.use(cookieParser());
router.use(express.json());

// router.get("/profile", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.email });
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

router.get("/profile", verifyToken, async (req, res) => {
  try {
    console.log("1")
    // Find the user based on the email from the verified token
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Find all games purchased by the user
    const games = await Transaction.find({ userEmail: user.email });

    // Return both user details and games
    const data = {
      user: {
        username: user.username || 'Username',
        name: user.name || 'User Name',
        email: user.email,
        bio: user.bio || 'This is your bio.',
        badges: user.badges || 0, // Assuming badges are stored in the user schema
      },
      games
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.post('/add',verifyToken, async (req, res) => {
  const { gameName, gamePrice, transactionId } = req.body;
  const Email=req.email;

  try {
    const transaction = new Transaction({
      gameName,
      gamePrice,
      userEmail:Email,
      transactionId
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving transaction', error });
  }
});

router.get('/checkPurchase/:id', verifyToken, async (req, res) => {
  const userEmail = req.email;
  // const gameId = req.params.gameId;
  const gameId = req.params.id;
  

  try {
    console.log("hi")
    const data=await Games.findOne({game_Id:gameId});
    console.log(data)
    const gameName=data.game_name;
    console.log(gameName)
    // Check if the user has already bought the game
    const transaction = await Transaction.findOne({ userEmail, gameName });

    if (transaction) {
      res.status(200).json({ hasPurchased: true });
    } else {
      res.status(200).json({ hasPurchased: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking purchase', error });
  }
});

router.get("/transaction",verifyToken,async(req,res)=>{
  console.log("test")
  const data=await Transaction.find()
  res.json(data)
  })

// router.get('/profile', verifyToken, async (req, res) => {
//   const userEmail = req.email; // Extract the email from the verified token
  
//   try {
//     // Find all transactions related to this user
//     const transactions = await Transaction.find({ userEmail });

//     // Map transactions to extract the game details
//     const games = transactions.map(transaction => ({
//       name: transaction.gameName,
//       price: transaction.gamePrice,
//       transactionId: transaction.transactionId,
//       purchasedOn: transaction.createdAt // assuming createdAt is the purchase date
//     }));
//     const user = await User.findOne({ email: req.email });
//     // Respond with user details including purchased games
//     res.status(200).json({
//       username: user.username, // Assuming this is stored in the token
//       email: userEmail,
//       games: games,
//       badges: req.user.badges || 0 // Assuming badges are stored in the token
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching profile data', error });
//   }
// });

module.exports = router;