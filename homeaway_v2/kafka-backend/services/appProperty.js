var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));

  var property = new Property({
    email: msg.email,
    city: msg.city,
    country: msg.country,
    strad: msg.strad,
    unit: msg.unit,
    zip: msg.zip,
    headline: msg.headline,
    propdesc: msg.propdesc,
    bedroom: msg.bedroom,
    accomodate: msg.accomodate,
    bathroom: msg.bathroom,
    baserate: msg.baserate,
    minstay: msg.minstay,
    proptype: msg.proptype,
    startDate: msg.startDate,
    endDate: msg.endDate,
    currency: msg.currency
  });

  property.save().then(
    property => {
      console.log("New Property Added : ", property);
      callback(null, true);
    },
    err => {
      console.log("Error Creating Property:" + err);
      callback(null, err);
    }
  );
}

exports.handle_request = handle_request;
