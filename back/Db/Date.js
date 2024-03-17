const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    title:String,
    description:String,
    date:Date
});

const dateModel = mongoose.model('Date', dateSchema);

module.exports = {dateModel};
