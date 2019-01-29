var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogapp');
var post = require('../models/post');
var router = express.Router();
var user = require('../models/user');
var passport = require('passport');
var nodemailer = require('nodemailer');

//global variables


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
            res.render('article', {topic: "technology",posts:dbpost});
        }
    });
});

router.post('/technology',function (req,res) {
    var image = req.body.img;
    var title = req.body.title;
    var content=req.body.content;
    var naya ={
      image:image,
      title:title,
      post:content,
      topic:"technology"
    };
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

router.get('/technology/new',function (req,res) {

  res.render('new',{topic:"technology"});
});

router.get('/technology/:id',function (req,res) {

    post.findById(req.params.id,function(err,found){
        if(err){
            console.log("Technology wala error");
            console.log(err);
        }
        else{

            //console.log(found);
            res.render('show',{showing:found});
        }
    });
});

router.get('/technology/:id/edit',function (req,res) {
    post.findById(req.params.id,function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Its here");
            res.render('edit',{found:found});
        }
    });
});


router.put('/technology/:id',function (req,res) {
    post.findByIdAndUpdate(req.params.id,{$set:{post:req.body.content,title:req.body.title,image:req.body.img}},function (err,found) {
        if(err){
            console.log(err);
        }
        else{
        res.redirect('/technology/'+req.params.id);
        }
    })
});

router.delete('/technology/:id',function (req,res) {
    post.findByIdAndDelete(req.params.id,function (err,found) {
        if (err){
            console.log(err);
        }
        else{
            res.redirect('/technology');
        }
    });
});

/*
      PERSONAL
 */

router.get('/personal',function (req,res) {
    post.find({topic:"personal"},{image:1,title:1},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            res.render('article', {topic: "personal",posts:dbpost});
        }
    });
});

router.post('/personal',function (req,res) {
    var image = req.body.img;
    var content=req.body.content;
    var naya ={
        image:image,
        post:content,
        topic:"personal"
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


router.get('/personal/new',function (req,res) {
    res.render('new',{topic:"personal"});
});

router.get('/personal/:id',function (req,res) {
    post.findById(req.params.id,function(err,found){
        if(err){
            console.log("Personal wala error");
            console.log(err);
        }
        else{
            //console.log(found);
            res.render('show',{showing:found});
        }
    });
});


/*
        SPORTS
 */

router.get('/sports',function (req,res) {
    post.find({topic:"sports"},{image:1,post:1},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            res.render('article', {topic: "sports",posts:dbpost});
        }
    });
});

router.post('/sports',function (req,res) {
    var image = req.body.img;
    var content=req.body.content;
    var naya ={
        image:image,
        post:content,
        topic:"sports"
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

router.get('/sports/new',function (req,res) {

    res.render('new',{topic:"sports"});

});

router.get('/sports/:id',function (req,res) {

    post.findById(req.params.id,function(err,found){
        if(err){
            console.log("Sports wala error");
            console.log(err);
        }
        else{
            //console.log(found);
            res.render('show',{showing:found});
        }
    });
});


/*
      POLITICS
 */


router.get('/politics',function (req,res) {
    post.find({topic:"politics"},{image:1,post:1},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            res.render('article', {topic: "politics",posts:dbpost});
        }

    });
});

router.post('/politics',function (req,res) {
    var image = req.body.img;
    var content=req.body.content;
    var naya ={
        image:image,
        post:content,
        topic:"politics"
    };
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


router.get('/politics/new',function (req,res) {

    res.render('new',{topic:"politics"});

});

router.get('/politics/:id',function (req,res) {

    post.findById(req.params.id,function(err,found){
        if(err){
            console.log("Politics wala error");
            console.log(err);
        }
        else{
            //console.log(found);
            res.render('show',{showing:found});
        }
    });
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




/*

router.post('/signup',function (req,res) {

    // this is just because there is no official ID if there is no need to write this line
    //let account = await.nodemailer.createTestAccount();
    username=req.body.username;
    password = req.body.password;

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "exampleid@gmail.com",
            pass: "your password"
        }
    });
    var rand,link,host;
    host=req.host;
    rand=Math.floor((Math.random()*100)+54);
    link="http://"+host+"/verify?id="+rand;
    mailOption={
        to : req.body.username,
        subject:'Please Verify Your Email',
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };
    console.log(mailOption);

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
        }
    });
    res.redirect('/');
});


router.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))===("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");

            user.register({username:username},password,function (err,user) {
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
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});

*/
