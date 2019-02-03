var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
   image:String,
   title:String,
   post:String,
    topic:String,
    author: {
        id: {
            ref: 'user',
            type: mongoose.Schema.Types.ObjectId
        },
        username:String,
    },
    comments:[{
       ref:'comment',
        type:mongoose.Schema.Types.ObjectId
    }]
});

var post = mongoose.model("post",PostSchema);

module.exports=post;