var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth_demo');

var user = mongoose.Schema({
    username: String,
    password: {type: String, select: false }  // select = false -> we must to use "select" for get this field
});

module.exports = mongoose.model('User', user);