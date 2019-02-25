var bcrypt = require("bcrypt");
var { mongoose } = require("../mongoDB/db/mongoose");
var { Usertable } = require("../mongoDB/models/usertable");
var { Property } = require("../mongoDB/models/property");
const jwt = require("jsonwebtoken");

function handle_request(msg, callback) {
  console.log("In view property handle request:" + JSON.stringify(msg));

  Property.findOneAndUpdate(
    { _id: msg._id },
    {
      $set: {
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
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
        callback(null, false);
      }
      console.log("updated property in db: " + doc);
      callback(null, true);
    }
  );
}

exports.handle_request = handle_request;
