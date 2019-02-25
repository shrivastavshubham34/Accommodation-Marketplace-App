var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
var Books = require("./services/books.js");
var homeawaylogin = require("./services/homeawaylogin.js");
var login = require("./services/login.js");
var signup = require("./services/signup.js");
var addprop = require("./services/appProperty.js");
var listprop = require("./services/listProperty.js");
var viewprop = require("./services/viewProperty.js");
var updateProfile = require("./services/updateProfile.js");
var updateproperty = require("./services/updateProperty.js");
var jwtauth = require("./services/jwtauth.js");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book", homeawaylogin);
handleTopicRequest("login", login);
handleTopicRequest("signup", signup);
handleTopicRequest("addprop", addprop);
handleTopicRequest("proplist", listprop);
handleTopicRequest("propview", viewprop);
handleTopicRequest("updateProfile", updateProfile);
handleTopicRequest("updateProperty", updateproperty);
handleTopicRequest("jwtauth", jwtauth);
