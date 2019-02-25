var mongoose = require("mongoose");

const propSchema = new mongoose.Schema({
  email: String,
  city: String,
  country: String,
  strad: String,
  unit: String,
  zip: Number,
  headline: String,
  propdesc: String,
  bedroom: Number,
  accomodate: Number,
  bathroom: Number,
  baserate: Number,
  minstay: Number,
  proptype: String,
  startDate: String,
  endDate: String,
  currency: String
});

var Property = mongoose.model("property", propSchema);

module.exports = { Property };
