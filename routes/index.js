var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , message : req.flash('success')});
  next()
});

// router.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
router.get('/success', function(req, res, next) {
  res.send('Successfully logged in')
  next()
});
module.exports = router;
