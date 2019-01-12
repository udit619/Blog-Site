var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogapp');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/technology',function (req,res) {
  res.render('article',{topic:"Technology"});
});

router.get('/personal',function (req,res) {
    res.render('article',{topic:"Personal"});
});

router.get('/sports',function (req,res) {
    res.render('article',{topic:"Sports"});
});

router.get('/politics',function (req,res) {
    res.render('article',{topic:"Politics"});
});




module.exports = router;
