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
const Games =require("../models/gameModel.js")
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.post("/addgame", async (req, res) => {
    try {
      const userData = req.body;
      console.log(userData)
      const game = new Games(userData);
      console.log("1")
      await game.save();
      console.log("2")
      res.status(200).send({ message: "game added" });
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.get("/getgames", verifyToken, async (req, res) => {
    try {
      const user = await Games.find();
      if (!user) {
        return res.status(404).send({ message: " no games found" });
      }
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.delete('/removegame/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;

        // Delete the game from the database
        const result = await Games.deleteOne({ game_Id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Game not found' });
        }

        res.status(200).send({ message: 'Game removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
router.get("/editsgame/:id",verifyToken,async(req,res)=>{
    try{
        const id=req.params.id;
        const game=await Games.findOne({game_Id:id});
        if(!game){
            return res.status(404).send({message:"game not found"});
            }
            res.status(200).send(game);
            }catch(err){
                console.error(err);
                res.status(500).send({ message: 'Internal Server Error' });
            } 
    }
)
// Edit game route
router.put('/editgame/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        // Validate request body
        if (!updatedData.game_name || !updatedData.game_Id || !updatedData.game_studio || !updatedData.game_price || !updatedData.game_description) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Update the game in the database
        const result = await Games.updateOne(
            { game_Id: id },
            {
                $set: {
                    game_name: updatedData.game_name,
                    game_studio: updatedData.game_studio,
                    game_price: updatedData.game_price,
                    game_description: updatedData.game_description
                }
            }
        );

        if (result.nModified === 0) {
            return res.status(404).send({ message: 'Game not found or no changes made' });
        }

        res.status(200).send({ message: 'Game updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
module.exports = router;
