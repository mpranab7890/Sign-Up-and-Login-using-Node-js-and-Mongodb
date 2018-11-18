var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
var bcrypt = require('bcryptjs')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.get('/register', function(req, res, next) {
  res.render('register' , {title: 'Register' , errors: [] });
});

router.get('/login', function(req, res, next) {
  res.render('login' , {title: 'Login'});
});

router.post('/register' , (req , res) => {
	var data = {
		name : req.body.name,
		email : req.body.email,
		password : req.body.password,
	 	phone : req.body.PhoneNumber

	}
	
	// console.log(name)
	req.checkBody('name' , 'Name field is required').notEmpty()
	req.checkBody('email' , 'Email field is required').notEmpty()
	req.checkBody('email' , 'Invalid email').isEmail()
	req.checkBody('password' , 'Password field is required').notEmpty()
	req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('password' , 'Invalid password').isLength({min:6})
	req.checkBody('password' , 'Password doesnt match').equals(req.body.password2)
	req.checkBody('PhoneNumber' , 'Phone Number field is required').notEmpty()
	req.checkBody('PhoneNumber' , 'Invalid phone number').isMobilePhone()

	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(data.password, salt, function(err, hash) {
        data.password = hash
        // console.log(hash)
        // console.log(data.password)
        var errors = req.validationErrors()
		console.log(errors)
		if(errors) {
			console.log('Error!!')
			for (var err in errors){
			console.log(err.message)
			}
			res.render('register' , {title: 'Register' , errors : errors});
		}
	 	else{
	 		console.log('All good')
	 		var database = new User(data)
	 		database.save()
	 		req.flash('success' , 'You are now registered!')
	 		res.redirect('/')	
		}	
        
    });
});
	// console.log(data.password)


})

module.exports = router;
