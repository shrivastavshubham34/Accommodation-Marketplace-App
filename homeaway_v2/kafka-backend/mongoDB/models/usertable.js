var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const UsertabSchema = new mongoose.Schema({
  email: String,
  password: String,
  usertype: String,
  firstname: String,
  lastname: String,
  phone: Number,
  aboutme: String,
  city: String,
  country: String,
  company: String,
  school: String,
  hometown: String,
  language: [String],
  gender: String
});

UsertabSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UsertabSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Usertable = mongoose.model("usertable", UsertabSchema);

module.exports = { Usertable };
