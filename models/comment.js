var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
    comment:String,
    author:{
        id:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});

var comment = mongoose.model('comment',CommentSchema);

module.exports = comment;