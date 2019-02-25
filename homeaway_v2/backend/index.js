var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const passport = require("passport");

var kafka = require("./kafka/client");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function(req, res, next) {
  var token = req.headers["authorization"];
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
app.use(passport.initialize());
require("./config/passport")(passport);

app.post("/login", function(
  req,
  res
) {
  var email = req.body.email;
  var password = req.body.password;

  console.log("Username:", email + " password:", password);

  kafka.make_request("login", req.body, function(err, results) {
    console.log("in login ");
    console.log(typeof results);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      if (typeof results === "string") {
        res.sendStatus(400).end();
      } else {
        res.code = "200";
        res.send({
          token: results.token,
          email: results.email,
          usertype: results.usertype
        });

        res.end();
      }
    }
  });
});

//Route to handle logout Call
app.post("/logout", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  con.end(function(err) {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    if (err) {
      res.end("can't close the connection");
    } else res.end("successfully logged out");
  });
});

//Route to add signup details
app.post("/signup", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  console.log("Inside signup Request");

  console.log("Req Body : ", req.body);

  kafka.make_request("signup", req.body, function(err, results) {
    console.log("in signup ");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      if (results) res.sendStatus(200).end();
      else res.sendStatus(400).end();
    }
  });
});

//Adding property to DB
app.post(
  "/owner/addprop",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log("Inside Add Property Request");
    console.log("Req Body : ", req.body);

    kafka.make_request("addprop", req.body, function(err, results) {
      console.log("add property");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: err
        });
      } else {
        if (results === true) res.sendStatus(200).end();
        else res.sendStatus(400).end(result);
      }
    });
  }
);

//Route to get Displaying Property list
app.get(
  "/propertylist/:email",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log("Inside Property List");
    var email = req.params.email.substring(1);
    console.log(email);
    kafka.make_request("proplist", email, function(err, results) {
      console.log("property list ");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: err
        });
      } else {
        res.code = "200";
        res.send({
          results
        });
      }
    });
  }
);

//Route to get Displaying Property
app.get(
  "/property/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log("Inside Property view");

    kafka.make_request("propview", req.params.id.substring(1), function(
      err,
      results
    ) {
      console.log("property view ");

      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: err
        });
      } else {
        res.code = "200";
        res.send({
          results
        });
      }
    });
  }
);

app.post(
  "/viewprofile",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log(
      "It worked! User id : " + req.user + ". has been authenticated"
    );
    res.send({ user: req.user }).end();
  }
);

app.post("/update", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  console.log("Inside owner signup Request");

  console.log("Req Body : ", req.body);

  kafka.make_request("updateProfile", req.body, function(err, results) {
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: err
      });
    } else {
      if (results) res.sendStatus(200).end();
      else res.sendStatus(400).end();
    }
  });
});

app.post(
  "/owner/updateprop",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log("Inside property update Request");

    console.log("Req Body : ", req.body);

    kafka.make_request("updateProperty", req.body, function(err, results) {
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: err
        });
      } else {
        if (results) res.sendStatus(200).end();
        else res.sendStatus(400).end();
      }
    });
  }
);

app.post(
  "/tokendemo",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
	
res.send("it worked");
    res.send("It worked! User id is: " + req.user._id + ".");
  }
);

app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});
