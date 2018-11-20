var mongoose = require('mongoose')
datab = 'mongodb://localhost:27017/usersdata'
mongoose.connect(datab)
var db = mongoose.connection
var id = mongoose.Schema.Types.Mixed
var userSchema = mongoose.Schema({
	name: {type: String , index : true},
	email: String,
	password : id,
	phone : Number
})

var User = mongoose.model('User' , userSchema)



module.exports = User
