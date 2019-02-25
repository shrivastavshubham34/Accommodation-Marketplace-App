//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var math = require("mathjs");

//var session = require("express-session");
//var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//Route to handle Post Request Call
//Route to get userinfo page
app.get("/calc", function(req, res) {
  console.log("Inside Node calc method");
  var temp = req.query.input;

  var output = math.eval(temp);

  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  console.log(output);
  res.end(JSON.stringify(output));
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
