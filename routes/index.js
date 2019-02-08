var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogapp');
var post = require('../models/post');

var user = require('../models/user');
var passport = require('passport');
var Comment = require('../models/comment');
var middleware = require('../middleware');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*
      ROUTES FOR DIFFERENT TOPICS
 */

/*
        Technology
 */
router.get('/technology',function (req,res) {
    post.find({topic:"technology"},{image:1,title:1},function (err,dbpost) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('topics/article', {topic: "technology",posts:dbpost});

        }
    });
});

router.post('/technology',middleware.loggedIn,function (req,res) {
    var image = req.body.img;
    var title = req.body.title;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var content=req.body.content;
    var naya ={
      image:image,
      title:title,
      post:content,
      topic:"technology",
      author:author
    };
    console.log(naya);
    post.create(naya,function (err,blog) {
       if(err){
           console.log('error');
           console.log(err);
       }
       else{
           res.redirect('/technology');
       }
    });
});

router.get('/technology/new',middleware.loggedIn,function (req,res) {

  res.render('new',{topic:"technology"});
});

router.get('/technology/:id',function (req,res) {

    post.findById(req.params.id).populate('comments').exec(function(err,found){
        if(err){
            console.log("Technology wala error");
            console.log(err);
        }
        else{

            //console.log(found);
            res.render('topics/show',{showing:found});
        }
    });
});

router.get('/technology/:id/edit/',middleware.author,function (req,res) {
    console.log(req.params);
    post.findById(req.params.id,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Its here");
            res.render('topics/edit',{found:found});
        }
    });
});


router.put('/technology/:id',middleware.author,function (req,res) {
    post.findByIdAndUpdate(req.params.id,{$set:{post:req.body.content,title:req.body.title,image:req.body.img}},function (err,found) {
        if(err){
            console.log(err);
        }
        else{
        res.redirect('/technology/'+req.params.id);
        }
    })
});

router.delete('/technology/:id',middleware.author,function (req,res) {
    post.findByIdAndDelete(req.params.id,function (err,found) {
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/technology');
        }
    });
});

router.get('/technology/:id/comments/new',middleware.loggedIn,function(req,res){
    post.findById(req.params.id,function (err,post){
        if(err){
            console.log(err)
        }
        else{
            console.log("Yahan tk ");
            res.render('comment/new',{topic:'technology',id:req.params.id});
        }
        });

});

router.post('/technology/:id/comments',middleware.loggedIn,function (req,res) {
    post.findById(req.params.id,function (err,post) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Yahan tk aaya");
            var commented = req.body.comment;
            var author={
                id:req.user._id,
                username:req.user.username
            };
            var naya={
              comment:commented,
              author:author
            };
            console.log(naya);
            Comment.create(naya,function (err,comment) {
                if(err){
                    console.log(err);
                }
                else{
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/technology/'+req.params.id);
                }

            })
        }
        
    })
    
});

router.get('/technology/:id/comments/:ids/edit/',middleware.comment,function (req,res) {
    Comment.findById(req.params.ids,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            var x =req.params.id;
            res.render('comment/edit.ejs',{found:found,topic:'technology',blog:x});
        }
    });

});

router.put('/technology/:id/comments/:ids',middleware.comment,function (req,res) {
   Comment.findByIdAndUpdate(req.params.ids,{comment:req.body.comment},function (err,update) {
       if(err){
           console.log(err);
       }
       else{
           res.redirect('/technology/'+req.params.id);
       }

   });

});

router.delete('/technology/:id/comments/:ids',middleware.comment,function (req,res) {
   Comment.findByIdAndDelete(req.params.ids,function (err,found) {
       if(err){
           console.log(err);
       }
       else{
           res.redirect('/technology/'+req.params.id);
       }
   });
});


/*
      PERSONAL
 */

router.get('/personal',function (req,res) {
    post.find({topic:"personal"},{image:1,title:1},function (err,dbpost) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('topics/article', {topic: "personal",posts:dbpost});

        }
    });
});

router.post('/personal',middleware.loggedIn,function (req,res) {
    var image = req.body.img;
    var content=req.body.content;
    var title=req.body.title;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var naya ={
        title:title,
        image:image,
        post:content,
        topic:"personal",
        author:author
    };
    post.create(naya,function (err,blog) {
        if(err){
            console.log('error');
            console.log(err);
        }
        else{
            res.redirect('/personal');
        }
    });
});


router.get('/personal/new',middleware.loggedIn,function (req,res) {
    res.render('new',{topic:"personal"});
});

router.get('/personal/:id',function (req,res) {
    post.findById(req.params.id).populate('comments').exec(function(err,found){
        if(err){
            console.log("Personal wala error");
            console.log(err);
        }
        else{

            res.render('topics/show',{showing:found});
        }
    });
});


router.get('/personal/:id/edit',middleware.author,function (req,res) {
    post.findById(req.params.id,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Its here");
            res.render('topics/edit',{found:found});
        }
    });
});


router.put('/personal/:id',middleware.author,function (req,res) {
    post.findByIdAndUpdate(req.params.id,{$set:{post:req.body.content,title:req.body.title,image:req.body.img}},function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/personal/'+req.params.id);
        }
    })
});

router.delete('/personal/:id',middleware.author,function (req,res) {
    post.findByIdAndDelete(req.params.id,function (err,found) {
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/personal');
        }
    });
});

router.get('/personal/:id/comments/new',middleware.loggedIn,function(req,res){
    post.findById(req.params.id,function (err,post){
        if(err){
            console.log(err)
        }
        else{
            console.log("Yahan tk ");
            res.render('comment/new',{topic:'personal',id:req.params.id});
        }
    });

});

router.post('/personal/:id/comments',middleware.loggedIn,function (req,res) {
    post.findById(req.params.id,function (err,post) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Yahan tk aaya");
            var commented = req.body.comment;
            var author={
                id:req.user._id,
                username:req.user.username
            };
            var naya={
                comment:commented,
                author:author
            };
            console.log(naya);
            Comment.create(naya,function (err,comment) {
                if(err){
                    console.log(err);
                }
                else{
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/personal/'+req.params.id);
                }

            })
        }

    })

});


router.get('/personal/:id/comments/:ids/edit/',middleware.comment,function (req,res) {
    Comment.findById(req.params.ids,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            var x =req.params.id;
            res.render('comment/edit.ejs',{found:found,topic:'personal',blog:x});
        }
    });

});

router.put('/personal/:id/comments/:ids',middleware.comment,function (req,res) {
    Comment.findByIdAndUpdate(req.params.ids,{comment:req.body.comment},function (err,update) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/personal/'+req.params.id);
        }

    });

});

router.delete('/personal/:id/comments/:ids',middleware.comment,function (req,res) {
    Comment.findByIdAndDelete(req.params.ids,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/personal/'+req.params.id);
        }

    })

});


/*
        SPORTS
 */

router.get('/sports',function (req,res) {
    post.find({topic:"sports"},{image:1,title:1},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            res.render('topics/article', {topic: "sports",posts:dbpost});
        }
    });
});

router.post('/sports',middleware.loggedIn,function (req,res) {
    var image = req.body.img;
    var content=req.body.content;
    var title = req.body.title;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var naya ={
        title:title,
        image:image,
        post:content,
        topic:"sports",
        author:author
    };
    post.create(naya,function (err,blog) {
        if(err){
            console.log('error');
            console.log(err);
        }
        else{
            res.redirect('/sports');
        }
    });
});

router.get('/sports/new',middleware.loggedIn,function (req,res) {

    res.render('new',{topic:"sports"});

});

router.get('/sports/:id',function (req,res) {

    post.findById(req.params.id).populate('comments').exec(function(err,found){
        if(err){
            console.log("Sports wala error");
            console.log(err);
        }
        else{
            //console.log(found);
            res.render('topics/show',{showing:found});
        }
    });
});



router.get('/sports/:id/edit',middleware.author,function (req,res) {
    post.findById(req.params.id,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Its here");
            res.render('topics/edit',{found:found});
        }
    });
});


router.put('/sports/:id',middleware.author,function (req,res) {
    post.findByIdAndUpdate(req.params.id,{$set:{post:req.body.content,title:req.body.title,image:req.body.img}},function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/sports/'+req.params.id);
        }
    })
});

router.delete('/sports/:id',middleware.author,function (req,res) {
    post.findByIdAndDelete(req.params.id,function (err,found) {
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/sports');
        }
    });
});

router.get('/sports/:id/comments/new',middleware.loggedIn,function(req,res){
    post.findById(req.params.id,function (err,post){
        if(err){
            console.log(err)
        }
        else{
            console.log("Yahan tk ");
            res.render('comment/new',{topic:'sports',id:req.params.id});
        }
    });

});

router.post('/sports/:id/comments',middleware.loggedIn,function (req,res) {
    post.findById(req.params.id,function (err,post) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Yahan tk aaya");
            var commented = req.body.comment;
            var author={
                id:req.user._id,
                username:req.user.username
            };
            var naya={
                comment:commented,
                author:author
            };
            console.log(naya);
            Comment.create(naya,function (err,comment) {
                if(err){
                    console.log(err);
                }
                else{
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/sports/'+req.params.id);
                }

            })
        }

    })

});


router.get('/sports/:id/comments/:ids/edit/',middleware.comment,function (req,res) {
    Comment.findById(req.params.ids,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            var x =req.params.id;
            res.render('comment/edit.ejs',{found:found,topic:'sports',blog:x});
        }
    });

});

router.put('/sports/:id/comments/:ids',middleware.comment,function (req,res) {
    Comment.findByIdAndUpdate(req.params.ids,{comment:req.body.comment},function (err,update) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/sports/'+req.params.id);
        }

    });

});

router.delete('/sports/:id/comments/:ids',middleware.comment,function (req,res) {
    Comment.findByIdAndDelete(req.params.ids,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/sports/'+req.params.id);
        }
    })
});



/*
      POLITICS
 */


router.get('/politics',function (req,res) {
    post.find({topic:"politics"},{image:1,title:1},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            res.render('topics/article', {topic: "politics",posts:dbpost});

        }

    });
});

router.post('/politics',middleware.loggedIn,function (req,res) {
    var image = req.body.img;
    var content=req.body.content;
    var author={
        id:req.user._id,
            username:req.user.username
    };
    var title= req.body.title;
    var naya ={
        title:title,
        image:image,
        post:content,
        topic:"politics",
        author:author
    };
    console.log(naya);
    post.create(naya,function (err,blog) {
        if(err){
            console.log('error');
            console.log(err);
        }
        else{
            res.redirect('/politics');
        }
    });
});


router.get('/politics/new',middleware.loggedIn,function (req,res) {

    res.render('new',{topic:"politics"});

});

router.get('/politics/:id',function (req,res) {

    post.findById(req.params.id).populate('comments').exec(function(err,found){
        if(err){
            console.log("Politics wala error");
            console.log(err);
        }
        else{
            console.log(found);
            res.render('topics/show',{showing:found});
        }
    });
});


router.get('/politics/:id/edit',middleware.author,function (req,res) {
    post.findById(req.params.id,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Its here");
            res.render('topics/edit',{found:found});
        }
    });
});


router.put('/politics/:id',middleware.author,function (req,res) {
    post.findByIdAndUpdate(req.params.id,{$set:{post:req.body.content,title:req.body.title,image:req.body.img}},function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/politics/'+req.params.id);
        }
    })
});

router.delete('/politics/:id',middleware.author,function (req,res) {
    post.findByIdAndDelete(req.params.id,function (err,found) {
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/politics');
        }
    });
});

router.get('/politics/:id/comments/new',middleware.loggedIn,function(req,res){
    post.findById(req.params.id,function (err,post){
        if(err){
            console.log(err)
        }
        else{
            console.log("Yahan tk ");
            res.render('comment/new',{topic:'politics',id:req.params.id});
        }
    });

});

router.post('/politics/:id/comments',middleware.loggedIn,function (req,res) {
    post.findById(req.params.id,function (err,post) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Yahan tk aaya");
            var commented = req.body.comment;
            var author={
                id:req.user._id,
                username:req.user.username
            };
            var naya={
                comment:commented,
                author:author
            };
            console.log(naya);
            Comment.create(naya,function (err,comment) {
                if(err){
                    console.log(err);
                }
                else{
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/politics/'+req.params.id);
                }

            })
        }

    })

});


router.get('/politics/:id/comments/:ids/edit/',middleware.comment,function (req,res) {
    Comment.findById(req.params.ids,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            var x =req.params.id;
            res.render('comment/edit.ejs',{found:found,topic:'politics',blog:x});
        }
    });

});

router.put('/politics/:id/comments/:ids',middleware.comment,function (req,res) {
    Comment.findByIdAndUpdate(req.params.ids,{comment:req.body.comment},function (err,update) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/politics/'+req.params.id);
        }

    });

});

router.delete('/politics/:id/comments/:ids',middleware.comment,function (req,res) {
    Comment.findByIdAndDelete(req.params.ids,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/politics/'+req.params.id);
        }

    })

});




/*
            LOGIN AND SIGNUP
 */

router.get('/signup',function (req,res)
    {
        res.render('signup');
    });


router.post('/signup',function (req,res) {

    user.register({username:req.body.username},req.body.password,function (err,user) {
        if(err){
            console.log(err);
            return res.render('signup') }
        else
        {
            passport.authenticate('local')(req,res,function () {
                res.redirect('/');
            });
        }
    });

    });



router.get('/login',function (req,res) {
    res.render('login');
});

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    faliureRedirect:'/login'
}),function (req,res) {
});

router.get('/logout',function (req,res) {
   req.logout();
   res.redirect('/');
});




module.exports = router;




