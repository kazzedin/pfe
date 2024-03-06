const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
  sender:String,
  message:String,
  info:{
    nomPrenom: String,
    filier: String,
    section: String,
    matricule: String
  },
  type:{type:String,
  enum:['contact','login-info-etu','login-info-prf']},
  etat:{type:Boolean, default:false}
});

const messageModel=mongoose.model('messages',messageSchema);

module.exports={messageModel}