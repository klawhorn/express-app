var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/new', function(req, res, next) {
  var db = req.db;
  var collection = db.get('itemcollection');
  var newPageObj = {
    header: "h1",
    subheader: "h2"
  };
  collection.find({}, {}, function(e, docs) {
    newPageObj.itemsList = docs;
    res.render('new', newPageObj);
  })
});

/* POST A THING */
router.get('/make', function(req, res) {
  res.render('make', {title: "Add new user"});
});

router.post('/addprop', function(req,res,next) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var prop1 = req.body.prop1;
  var prop2 = req.body.prop2;

  // Set our collection
  var collection = db.get('itemcollection');

  // Submit to the DB
  collection.insert({
      "prop1" : prop1,
      "prop2" : prop2
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("new");
      }
  });
});

router.get('/newCar', function(req,res,next) {
  res.render('newCar', {header: "Add a car"});
});

router.post('/addCar', function (req,res,next) {
  var db = req.db,
      collection = db.get('carCollection'),
      carMake = req.body.make,
      carModel = req.body.model;

  collection.insert({
    make: carMake,
    model: carModel
  }, function(err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // And forward to success page
      res.redirect("savedCars");
    }
  });
});

router.get('/savedCars', function(req, res, next) {
  var db = req.db,
      collection = db.get('carCollection');
  collection.find({},{}, function (e, docs) {
    let pageObj = {
      header: "These are the saved cars",
      cars: docs
    };
    res.render('savedCars', pageObj);
  });
});


module.exports = router;
