var fs = require('fs');
var path = require('path');
var User = require('../models/User');

exports.index = function(req, res) {
        res.render('index', { title: 'Fable', user: req.user });
};