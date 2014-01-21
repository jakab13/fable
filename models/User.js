var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	oauthId : Number,
    email: { type : String , lowercase : true},
	provider: String,
	name : String,
	username: String,
    friendsList: String,
	createdAt : Date
});

var User = mongoose.model('User', UserSchema);

module.exports = User;