var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const UsertabSchema = new mongoose.Schema({
  email: String,
  password: String,
  usertype: String,
  firstName: String,
  lastName: String,
  gender: String
});

UsertabSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UsertabSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model("user", UsertabSchema);

module.exports = { User };
