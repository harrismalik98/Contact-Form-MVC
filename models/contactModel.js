const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/contact");

const clientSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true, minLength:3},
    email: {type:String, required:true, unique:true},
    phoneno: Number,
    msg: String,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;