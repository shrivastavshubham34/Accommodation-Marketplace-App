var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  console.log("In list your property handle request:" + JSON.stringify(msg));

  Property.find({
    email: msg
  }).then(
    property => {
      console.log(property);
      callback(null, property);
    },
    err => {
      callback(null, err);
    }
  );
}

exports.handle_request = handle_request;
