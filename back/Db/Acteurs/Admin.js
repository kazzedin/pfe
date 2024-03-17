const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String, 
    password: String,
    photo_profile:{type:String,default:"/public/other.jpg"}
});

const adminModel = mongoose.model('admin', adminSchema);

module.exports = { adminModel };
