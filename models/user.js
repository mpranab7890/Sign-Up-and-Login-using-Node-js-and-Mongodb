var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/usersdata')
var db = mongoose.connection

var userSchema = mongoose.Schema({
	name: {type: String , index : true},
	email: String,
	password : String,
	phone : Number
})

var User = mongoose.model('User' , userSchema)

module.exports = User