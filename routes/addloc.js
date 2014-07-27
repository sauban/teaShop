var mongodb = require('mongodb');
var monk = require('monk');

var db = monk('localhost:30000/teaLocation');
var collection = db.get('teaShopdetails');

/*Home Page*/
exports.index = function(req, res){
  collection.find({},{},function(e,docs){
        res.render('index', {
            "data" : docs,
            "title" : "Shops in Mumbai"
        });
    });
};

/*Viewing page*/

exports.view = function(req, res){
    var id = req.params.id;
    collection.findOne({'_id' : id}, function(err, docs){
      res.locals.data = docs;
      res.render('info',{
            "title" : docs.name
      });
  });
};


/*Adding New page*/

exports.create = function(req, res){
    res.render('addloc', {title: 'New TeaShop'});
};

exports.add = function(req, res){
  var body = req.body;

   collection.insert({
    name : body.name,
    Description : body.Locdetails,
    location : {
      lat : body.Lat,
      long : body.Long
    }
  }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /create
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
   })
};

/*Updating Tea shop*/

exports.edit = function(req, res) {
      collection.findOne({'_id':req.params.id}, function(err, data){
          res.render('edit', {
            title: 'Updating ' + data.name,
            data: data
          })

      });
  };


exports.update = function(req, res){
    var  body = req.body;
    collection.update({_id: body.id},
      {$set: {
                name: body.name,
                Description: body.Locdetails,
                location : {
                  lat: body.Lat,
                  long: body.Long
                }
             }

      }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
      });

  };

/*Deleting Tea shop*/

exports.destroy = function(req, res){
    var id = req.params.id;
    collection.remove({_id : id});
    res.redirect("/");
  };