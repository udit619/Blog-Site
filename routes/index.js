var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogapp');
var post = require('../models/post');
var router = express.Router();


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

router.get('/login',function (req,res) {

    res.render('login');
});


module.exports = router;
