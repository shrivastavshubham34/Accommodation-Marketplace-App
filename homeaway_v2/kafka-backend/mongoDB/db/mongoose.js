var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://admin:test1234@ds033259.mlab.com:33259/homeaway",
  () => {
    console.log("connected to mongoDB");
  }
);

module.exports = { mongoose };
