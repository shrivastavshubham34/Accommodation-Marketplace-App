var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

  Usertable.findOne(
    {
      email: msg.email,
      usertype: "traveler"
    },
    function(err, user) {
      if (err) {
        console.log("error: " + err);
      } else if (user && user.validPassword(msg.password)) {
        console.log(user);
        callback(null, user);
        console.log("after callback");
      } else {
        console.log(
          "The email and password you entered did not match our records. Please double-check and try again."
        );
      }
    }
  );

  /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_request = handle_request;
