var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogapp');
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
  res.render('article',{topic:"technology"});
});

router.post('/technology',function (req,res) {
   res.redirect('/technology');
});

router.get('/technology/new',function (req,res) {

  res.render('new',{topic:"technology"});
});

/*
      PERSONAL
 */

router.get('/personal',function (req,res) {
    res.render('article',{topic:"personal"});
});

router.post('personal',function (req,res) {
  res.redirect('/personal');
});

router.get('/personal/new',function (req,res) {
    res.render('new',{topic:"personal"});
});


/*
        SPORTS
 */

router.get('/sports',function (req,res) {
    res.render('article',{topic:"sports"});
});

router.post('/sports',function (req,res) {
   res.redirect('/sports');
});

router.get('/sports/new',function (req,res) {

    res.render('new',{topic:"sports"});

});


/*
      POLITICS
 */
router.get('/politics',function (req,res) {
    res.render('article',{topic:"Politics"});
});

router.post('/politics',function (req,res) {
   res.redirect('/politics');
});

router.get('/politics/new',function (req,res) {

    res.render('new',{topic:"politics"});

});



module.exports = router;
