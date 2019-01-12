var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
   image:text,
   post:text
});

var post = mongoose.model(post,PostSchema);

module.exports=post;