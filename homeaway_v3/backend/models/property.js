var mongoose = require("mongoose");

const propSchema = new mongoose.Schema({
  city: String,
  zip: Number,
  title: String,
  description: String,
  startDate: {
    type: String,
    default: "01/01/1990"
  },
  endDate: {
    type: String,
    default: "12/31/2099"
  },
  ownerID: String,
  bookedByID: String
});

var Property = mongoose.model("property", propSchema);

module.exports = { Property };
