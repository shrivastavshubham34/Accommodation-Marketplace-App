var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

  Usertable.findOne(
    {
      email: msg.email,
      usertype: msg.usertype
    },
    function(err, user) {
      if (err) {
        res.value =
          "The email and password you entered did not match our records. Please double-check and try again.";
        console.log(res.value);
        callback(null, res.value);
      } else if (user && user.validPassword(msg.password)) {
        console.log("login successfull");
        var ID = {
          id: user._id
        };
        var token = jwt.sign(ID, "273LABSubmit", {
          expiresIn: 10800 // in seconds
        });
        console.log("Token:" + token);
        const userID = { token, email: user.email, usertype: user.usertype };
        callback(null, userID);
      } else {
        res.value =
          "The email and password you entered did not match our records. Please double-check and try again.";
        console.log(res.value);
        callback(null, res.value);
      }
    }
  );
}

exports.handle_request = handle_request;
