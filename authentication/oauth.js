var ids = {
	
//	LOCAL
	twitter : {
		consumerKey : 'xj4cPCXMQkobruiabJT1cw',
		consumerSecret : 'ryEXqER1rFabL5K8KacggIKaoza6Ry8uxzDfTIey0Q',
		callbackURL : "http://127.0.0.1:1337/auth/twitter/callback"
	},
	
	// ONLINE
	// twitter : {
		// consumerKey : 'ZaOSttG9IRZwYe25Ouvtvg',
		// consumerSecret : 'khV4HpvcaXWkVPSeDPfoP16FHVCoWZftAqPMR51z4',
		// callbackURL : "http://predicto.nodejitsu.com/auth/twitter/callback"
	// }

    facebook : {
        clientID : '204226133099643',
        clientSecret : '824f276007480f734a2a94a772c2c795',
        callbackURL : "http://127.0.0.1:3000/auth/facebook/callback"
    }
};

module.exports = ids;