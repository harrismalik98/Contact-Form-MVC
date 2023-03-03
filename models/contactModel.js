const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');// Package for automatically increment user _id

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/contact");

const connection = mongoose.connection;
autoIncrement.initialize(connection);

const clientSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true, minLength:3},
    email: {type:String, required:true, unique:true},
    phoneno: Number,
    image: String,
    filetype: String,
    msg: String,
});

clientSchema.plugin(autoIncrement.plugin, {
    model: 'Client',
    field: '_id',
    startAt: 1,
    incrementBy: 1
  });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;