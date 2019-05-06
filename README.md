connecting points:
1. Adding these lines to app.js at the top so that the app puts a ref to the db in each request
// db connection Code
var monk = require('monk');
var db = monk('localhost:27017/practiceApp1');

// Make our db accessible to our router once it is instantiated.
app.use(function(req,res,next){
    req.db = db;
    next();
});

2. the form name/action/method combo means the router catches the post request.

So you make routes that correspond to the actions in the forms. and those routes talk to the db. 
