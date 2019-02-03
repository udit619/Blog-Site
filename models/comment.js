var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
    comment:String,
    author:{
    id:{
        ref:'user',
         type:mongoose.Schema.Types.ObjectId
        },
        username:String
    }
});

var comment = mongoose.model('comment',CommentSchema);

module.exports = comment;