var passportlocalmongoose = require('passport-local-mongoose');
var mongoose = require('mongoose');

var Userschema = new mongoose.Schema({
    username:String,
    password:String
});

Userschema.plugin(passportlocalmongoose);

var user =  mongoose.model('user',Userschema);

module.exports = user;