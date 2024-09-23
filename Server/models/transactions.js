// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  gameId:{type:String,required:true},
  gameName: { type: String, required: true },
  gamePrice: { type: String, required: true },
  userEmail: { type: String, required: true },
  transactionId: { type: String, required: true },
  imageurl:{type:String,required:true},
  gameDescription:{type:String,required:true},
  createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
