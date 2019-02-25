var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  console.log("In view property handle request:" + JSON.stringify(msg));

  Property.find({
    _id: msg
  }).then(
    property => {
      console.log("found");
      callback(null, property);
    },
    err => {
      callback(null, property);
    }
  );
}

exports.handle_request = handle_request;
