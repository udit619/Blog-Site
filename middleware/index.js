var post = require('../models/post');
var comment = require('../models/comment');

middleware_obj={};

middleware_obj.loggedIn=function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


middleware_obj.author=function(req,res,next){
    if(req.isAuthenticated()){
        post.findById(req.params.id,function (err,found) {
            if(err){
                console.log("Yagan");
                console.log(err);
            }
            else{

                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect('back');
                }
            }

        });
    }
    else{
        console.log("WOrking");
        res.redirect('/login');
    }
};

middleware_obj.comment=function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.ids,function (err,found) {
            if(err){
                console.log(err);
            }
            else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect('back');
                }
            }
        });
    }
    else{
        res.redirect('/login');
    }
};


module.exports=middleware_obj