var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  console.log("In jwt auth handle request:" + JSON.stringify(msg));
  Usertable.findOne({ _id: msg.id }, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      console.log("token authenticated");
      callback(null, user);
    } else {
      console.log("token unauthorized");
      callback(null, false);
    }
  });
}

exports.handle_request = handle_request;
