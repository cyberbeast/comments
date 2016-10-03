var express = require('express');
var router = express.Router();

var firebase = require("firebase");

// Read Synchrously
 var fs = require("fs");
 console.log("\n *START* \n");
 var content = fs.readFileSync("keys.json");
 console.log("Output Content : \n"+ content);
 console.log("\n *EXIT* \n");

jsContent = JSON.parse(content);
// Initialize the app with no authentication
firebase.initializeApp({
  databaseURL: jsContent['databaseURL']
});

// The app only has access to public data as defined in the Security Rules
var db = firebase.database();
var ref = db.ref("/comments");
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
  msg = snapshot.val();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var stuff = {
    title: "Title",
    message: msg
  };
  res.render('index', stuff);
});

// Add comments
router.post('/', function (req, res) {
  console.log(req.body['name']);
  var commentsRef = ref.child(Date.now());
  commentsRef.set({
    "name" : req.body['name'],
    "comment": req.body['comment']
  });
  res.redirect('/');
  // res.send('comment added');
});

module.exports = router;
