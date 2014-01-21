
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var mongoose = require('mongoose');

var app = express();

// Models
var Story = require('./models/Story');
var User = require('./models/User');
// Routes
var user = require('./routes/user');
var story = require('./routes/story');
// login
var passport = require("passport");
var auth = require('./authentication/authentication.js');

mongoose.connect("mongodb://localhost/fable");

var db = mongoose.connection;

app.configure(function() {
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    //app.set('illustrations', path.join(__dirname + '/public/images/illustrations'));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.cookieParser());
    app.use(express.bodyParser({keepExtensions: true, uploadDir: path.join(__dirname, '/uploads')}));
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'SECRET' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/public')));
});


passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if(!err) done(null, user);
        else done(err, null)
    })
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

// USER ROUTES
//

app.get('/users', user.list);
app.param('userId', user.load);
app.get('/users/:userId', user.view);

// LOGIN and LOGOUT

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email', 'read_friendlists'] }),
    function(req, res){
    });
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/stories');
    });
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// STORIES

app.get('/stories', story.list);
app.get('/stories/new', ensureAuthenticated, story.new);
app.post('/stories/submit', ensureAuthenticated, story.submit);
app.param('storyId', story.load);
app.get('/stories/:storyId', story.view);

// ILLUSTRATIONS
app.get('/illustrations/:fileName', function(req, res, fileName) {
    res.sendfile(path.resolve('./illustrations/' + fileName));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}
