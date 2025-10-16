const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
},  { collection: "about" });

const AboutModel = mongoose.model('about', aboutSchema);
module.exports = AboutModel;

