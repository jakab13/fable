var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./../models/User.js');
var oauthConfig = require('./oauth.js');

module.exports = passport.use(new FacebookStrategy({
    clientID : oauthConfig.facebook.clientID,
    clientSecret : oauthConfig.facebook.clientSecret,
	callbackURL : oauthConfig.facebook.callbackURL
}, function(accessToken, refreshToken, profile, done) {
//	console.log(profile);
//    console.log(accessToken);
	User.findOne({
		oauthId : profile.id
	}, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!err && user != null) {
			done(null, user);
		} else {
			new User({
				oauthId : profile.id,
				provider: profile.provider,
				name : profile.displayName,
				email: profile.email,
				createdAt : Date.now()
			}).save(function(err) {
				if (err) {
					console.log(err);
				} else {
					// console.log("saving user ...");
					done(null, user);
				}
			});
		}
	});
}));