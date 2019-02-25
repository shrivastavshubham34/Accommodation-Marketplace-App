var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const jwt = require("jsonwebtoken");
var { User } = require("./models/user");
var { Property } = require("./models/property");
const passport = require("passport");
const cors = require("cors");
//var session = require("express-session");
//var cookieParser = require("cookie-parser");
//var cors = require("cors");
//app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
  var token = req.headers["authorization"];
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

const jwt2 = require("express-jwt");
require("dotenv").config();

//verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    jwt.verify(bearerToken, "273LABSubmit", (err, authdata) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
      } else {
        console.log("token verified!");
        console.log(authdata);
        console.log("done");
      }
    });

    next();
  } else {
    res.sendStatus(403);
  }
}

// auth middleware
const auth = jwt2({
  secret: "273LABSubmit",
  credentialsRequired: true
});

app.use(passport.initialize());
require("./config/passport")(passport);
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(
  "/graphql",
   verifyToken,
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.use(bodyParser.json());
app.post("/login", async (req, res) => {
  console.log(req.body);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (user != null) {
      User.findOne(
        {
          email: req.body.email,
          usertype: req.body.usertype
        },
        function(err, user) {
          if (err) {
            value =
              "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(err);
            callback(null, value);
          } else if (user && user.validPassword(req.body.password)) {
            console.log("login successfull");
            var ID = {
              id: user._id
            };
            var token = jwt.sign(ID, "273LABSubmit", {
              expiresIn: 10800 // in seconds
            });
            console.log("Token:" + token);
            const userID = {
              token,
              email: user.email,
              usertype: user.usertype
            };
            res.send(userID);
            res.status = 200;
            res.end();
          } else {
            value =
              "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(value);
            res.sendStatus(202).end();
          }
        }
      );
    } else res.sendStatus(201).end();
  });
});

app.post("/signup", async (req, res) => {
  console.log("Inside signup Request");

  console.log("Req Body : ", req.body);
  User.findOne({ email: req.body.email }, (err, results) => {
    if (results !== null) {
      console.log("value already exists");
      res.sendStatus(203).end();
    } else {
      console.log("add");
      let user = new User({
        email: req.body.email,
        usertype: req.body.usertype,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender
      });
      user.password = user.generateHash(req.body.password);
      user.save();
      console.log(user);

      res.sendStatus(200).end();
    }
  });
});

app.get(
  "/demo",
  //verifyToken,
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("done");
  }
),
  //Route to handle Post Request Call
  //Route to get userinfo page

  //start your server on port 3001
  app.listen(3001, () => {
    console.log("Server Listening on port 3001");
  });
