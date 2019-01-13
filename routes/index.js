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
    post.find({topic:"technology"},{image:1,post:1,_id:0},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(dbpost);
            res.render('article', {topic: "technology"});
        }

    });
});

router.post('/technology',function (req,res) {
    var image = req.body.img;
    var content=req.body.content;
    var naya ={
      image:image,
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

/*
      PERSONAL
 */

router.get('/personal',function (req,res) {
    post.find({topic:"personal"},{image:1,post:1,_id:0},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(dbpost);
            res.render('article', {topic: "personal"});
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


/*
        SPORTS
 */

router.get('/sports',function (req,res) {
    post.find({topic:"sports"},{image:1,post:1,_id:0},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(dbpost);
            res.render('article', {topic: "sports"});
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


/*
      POLITICS
 */
router.get('/politics',function (req,res) {
    post.find({topic:"politics"},{image:1,post:1,_id:0},function (err,dbpost) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(dbpost);
            res.render('article', {topic: "politics"});
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



module.exports = router;
