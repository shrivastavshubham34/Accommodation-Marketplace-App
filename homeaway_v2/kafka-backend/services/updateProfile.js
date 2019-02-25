var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  console.log("In view profile handle request:" + JSON.stringify(msg));

  Usertable.findOneAndUpdate(
    { _id: msg._id },
    {
      $set: {
        email: msg.email,
        firstName: msg.firstName,
        lastName: msg.lastName,
        phone: msg.phone,
        aboutme: msg.aboutme,
        city: msg.city,
        company: msg.company,
        school: msg.school,
        hometown: msg.hometown,
        language: msg.language,
        gender: msg.gender
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
        callback(null, false);
      }
      console.log("update doc in db: " + doc);
      callback(null, true);
    }
  );
}

exports.handle_request = handle_request;
