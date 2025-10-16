const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    movieName: String,
    year: String,
    quality: String,
    email: String,
    info: String
},  { collection: "requests" });

const RequestModel = mongoose.model('requests', requestSchema);
module.exports = RequestModel;
