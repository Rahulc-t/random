const {Schema}=require('mongoose');
const {model}=require('mongoose');

const gamesDetails=new Schema({
    game_name:{type:String,required:true},
    game_Id:{type:String,required:true,unique:true},
    game_studio:{type:String,required:true},
    game_price:{type:String,required:true},
    game_description:{type:String,required:true}
    



})

const gameDetails=model('gamedetails',gamesDetails);
module.exports=gameDetails;