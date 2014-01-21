
/*
 * GET users listing.
 */

var fs = require('fs');
var path = require('path');
var User = require('../models/User');
var Story = require('../models/Story');

exports.list = function(req, res){
    User.find({}, function (err, docs) {
        res.render('users/users',
            {title: 'Users', users: docs});
    });
};

exports.load = function(req, res, next, userId) {
    Story.find({
        authorId : userId
    }, function(err, storyDocs) {
        User.find({
            _id : userId
        }, function(err, userDocs) {
            user = userDocs[0];
            stories = storyDocs;
            next();
        });
    });
};

exports.view = function(req, res) {
        res.render("users/view", {
            user : user,
            stories: stories
        });
};