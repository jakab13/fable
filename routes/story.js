
var fs = require('fs');
var path = require('path');
var Story = require('../models/Story');
var User = require('../models/User');

exports.list = function(req, res){
    Story.find({}, function (err, docs) {
        res.render('stories/story',
            {title: 'Stories', stories: docs, user: req.user});
    });
};

exports.new = function(req, res){
        res.render('stories/new', { title: 'New Story', user: req.user});
};

exports.submit = function(req, res, next){
    var b = req.body;
//    var name = req.files.illustration.name;
    var tempPath = req.files.illustration.path;
    var targetPath = path.resolve('./public/images/illustrations/' + req.files.illustration.name);
    fs.rename(tempPath, targetPath, function(err){
        if (err) next(err);
        new Story({
            authorId: req.user.id,
            title : b.title,
            body : b.body,
            illustrationPath: '/images/illustrations/' + req.files.illustration.name,
            createdAt: Date.now(),
            reminderFrom: b.reminderFrom
        }).save(function(err, story) {
                if (err)
                    res.json(err);
                res.redirect('/stories/' + story._id);
            });
//    });
    });
};

exports.load = function(req, res, next, storyId) {
    Story.find({
        _id : storyId
    }, function(err, storyDocs) {
        User.find({
            _id: storyDocs[0].authorId
        }, function(err, authorDocs)    {
            Story.find({
               reminderFrom: storyDocs[0]._id
            }, function(err, reminderDocs)  {
                story = storyDocs[0];
                author = authorDocs[0];
                reminders = reminderDocs;
                next();
                });
        });
    });
};

exports.view = function(req, res) {
    res.render("stories/view", {
        story : story,
        author: author,
        reminders: reminders,
        user: req.user
    });
};

