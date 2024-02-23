const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
  sender:String,
  message:String,
  type:{type:String,
  enum:['contact','login-info']}
});

const messageModel=mongoose.model('messages',messageSchema);

module.exports={messageModel}