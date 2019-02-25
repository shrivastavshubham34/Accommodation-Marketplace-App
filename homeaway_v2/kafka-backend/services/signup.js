var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

  var profile = new Usertable({
    email: msg.email,
    usertype: msg.usertype,
    firstName: msg.firstName,
    lastName: msg.lastName,
    phone: msg.phone,
    aboutme: msg.aboutme,
    city: msg.city,
    country: msg.country,
    company: msg.company,
    school: msg.school,
    hometown: msg.hometown,
    language: msg.language,
    gender: msg.gender
  });
  profile.password = profile.generateHash(msg.password);

  profile.save().then(
    profile => {
      console.log("Profile created : ", profile);
      callback(null, true);
    },
    err => {
      console.log("Error Creating Profile");
      callback(null, err);
    }
  );
}

exports.handle_request = handle_request;
