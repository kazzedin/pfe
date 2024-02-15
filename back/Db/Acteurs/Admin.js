const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:String,
    email: { type: String, default: 'admin@usthb.com' }, 
    password: { type: String, default: 'admin' },
});

const adminModel = mongoose.model('admin', adminSchema);

module.exports = { adminModel };
