var express = require('express');
var jwt = require('jwt-simple');  //for create tokens
var User = require('./user');  // User model
var app = express();
var bcrypt = require('bcrypt');  // form encrypt the password in the database
app.use(require('body-parser').json());

var secretKey = 'supercalifragilisticoespialidoso';


function validateUser(user, password, cb) {
    return bcrypt.compare(password, user.password, cb);
}

app.post('/session', function(req, res) {
    
    User.findOne({username: req.body.username})
        .select('username password')  // because in the model field password has select:false
        .exec(function(err, user) {
            if (err) {return next(err)};
            if (!user) {return res.sendStatus(401); };

            validateUser(user, req.body.password, function(err, valid) {
                if (err || !valid) {
                    return res.sendStatus(401);
                };
                var token = jwt.encode({username:user.username}, secretKey);
                res.json(token);
        });
    });
});


app.post('/user', function (req, res, next) {
    
    var user = new User({username: req.body.username});
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        user.password = hash;
        user.save(function(err,user) {
            if (err) { throw next(err) }
      
            res.sendStatus(201);
        });
    });
});

app.get('/user', function(req, res) {
    var token = req.headers['x-auth'];  // We use the token in header for authenticate user
    console.log(token);
    var auth = jwt.decode(token,secretKey);
    console.log(auth);
    User.findOne({username: auth.username}, function(err, user) {
        res.json(user);
    });
})

app.listen(3000);