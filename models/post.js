var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
   image:String,
   post:String,
    topic:String
});

var post = mongoose.model("post",PostSchema);

module.exports=post;