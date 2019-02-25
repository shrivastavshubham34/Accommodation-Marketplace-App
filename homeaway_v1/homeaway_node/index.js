//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var mysql = require("mysql");
app.set("view engine", "ejs");
var pool = require("./pool");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

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
app.post("/traveler/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var temp = "traveler";
  var sql =
    "SELECT *  FROM usertable WHERE email = " +
    mysql.escape(email) +
    "and password = " +
    mysql.escape(password) +
    "and usertype = " +
    mysql.escape(temp);
  console.log(sql);

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (result.length === 0) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid Credentials");
        } else {
          res.cookie(temp, email, {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          console.log(sql + "result:" + result);
          res.end("Successful Login");
        }
      });
    }
  });
});

app.post("/owner/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var temp = "owner";
  var sql =
    "SELECT *  FROM usertable WHERE email = " +
    mysql.escape(email) +
    "and password = " +
    mysql.escape(password) +
    "and usertype = " +
    mysql.escape(temp);
  console.log(sql);

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (result.length === 0) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid Credentials");
        } else {
          res.cookie(temp, email, {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          console.log(sql + "result:" + result);
          res.end("Successful Login");
        }
      });
    }
  });
});

//Route to handle Post Request Call
app.post("/logout", function(req, res) {
  con.end(function(err) {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    if (err) {
      res.end("can't close the connection");
    } else res.end("successfully logged out");
  });
});

//Route to get update traveler details
app.post("/signup/traveler", function(req, res) {
  console.log("Inside traveller signup Request");

  console.log("Req Body : ", req.body);

  var queryvar = "traveler";
  console.log("Req Body : ", req.body);

  var sql =
    "INSERT INTO usertable(email,password,usertype,firstname, lastname, phone) VALUES ( " +
    mysql.escape(req.body.email) +
    " , " +
    mysql.escape(req.body.password) +
    " , " +
    mysql.escape(queryvar) +
    " , " +
    mysql.escape(req.body.firstname) +
    " , " +
    mysql.escape(req.body.lastname) +
    " , " +
    mysql.escape(req.body.phone) +
    " ) ";

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error While Adding Students");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Student added Successfully");
        }
      });
    }
  });
});

//Route to get update owner details
app.post("/signup/owner", function(req, res) {
  console.log("Inside owner signup Request");
  var queryvar = "owner";
  console.log("Req Body : ", req.body);

  var sql =
    "INSERT INTO usertable(email,password,usertype,firstname, lastname, phone) VALUES ( " +
    mysql.escape(req.body.email) +
    " , " +
    mysql.escape(req.body.password) +
    " , " +
    mysql.escape(queryvar) +
    " , " +
    mysql.escape(req.body.firstname) +
    " , " +
    mysql.escape(req.body.lastname) +
    " , " +
    mysql.escape(req.body.phone) +
    " ) ";
  console.log("Owner SignUp query: " + sql);
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error While Adding Students");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Student added Successfully");
        }
      });
    }
  });
});

app.post("/owner/addprop", function(req, res) {
  console.log("Inside Add Property Request");
  var email = "shria";
  console.log("Req Body : ", req.body);

  var sql =
    "INSERT INTO property (email,city,country,strad, zip, headline,propdesc, bedroom, accomodate, bathroom,baserate, minstay, proptype, startDate,endDate,unit,currency) VALUES ( " +
    mysql.escape(email) +
    " , " +
    mysql.escape(req.body.city) +
    " , " +
    mysql.escape(req.body.country) +
    " , " +
    mysql.escape(req.body.strad) +
    " , " +
    mysql.escape(req.body.zip) +
    " , " +
    mysql.escape(req.body.headline) +
    " , " +
    mysql.escape(req.body.propdesc) +
    " , " +
    mysql.escape(req.body.bedroom) +
    " , " +
    mysql.escape(req.body.accomodate) +
    " , " +
    mysql.escape(req.body.bathroom) +
    " , " +
    mysql.escape(req.body.baserate) +
    " , " +
    mysql.escape(req.body.minstay) +
    " , " +
    mysql.escape(req.body.proptype) +
    " , " +
    mysql.escape(req.body.startDate.substring(0, 10)) +
    " , " +
    mysql.escape(req.body.endDate.substring(0, 10)) +
    " , " +
    mysql.escape(req.body.unit) +
    " , " +
    mysql.escape(req.body.currency) +
    " ) ";
  console.log("Owner SignUp query: " + sql);
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error While Adding Students");
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Student added Successfully");
        }
      });
    }
  });
});

//Route to get Displaying Property list
app.get("/propertylist", function(req, res) {
  console.log("Inside Property");
  var email1 = "shria";
  var sql =
    "SELECT property_id,headline,propdesc FROM property where email = " +
    mysql.escape(email1);
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error while retrieving Student Details");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          console.log(JSON.stringify(result));
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

//Route to get Displaying Property list
app.get("/property/:id", function(req, res) {
  console.log("Inside Property");

  var sql =
    "SELECT * FROM property where property_id = " +
    mysql.escape(req.params.id.substring(1));
  console.log(sql);
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error while retrieving Student Details");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          console.log(JSON.stringify(result));
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

app.post("/home", function(req, res) {
  console.log("Inside Delete Request");
  console.log("Student_ID to Delete : ", req.body);
  var sql =
    "DELETE FROM studentDetails WHERE sid = " + mysql.escape(req.body.sid);
  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      console.log("Could not access connection object");
      res.end("Could not access to connection object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Error Adding Students");
        } else {
          console.log("Students Deleted Successfully");
          sql = "SELECT * FROM studentDetails";
          con.query(sql, function(err, result) {
            if (err) {
              res.writeHead(400, {
                "Content-Type": "text/plain"
              });
              res.end("Error while retrieving Student Details");
            } else {
              res.writeHead(200, {
                "Content-Type": "application/json"
              });
              console.log(JSON.stringify(result));
              res.end(JSON.stringify(result));
            }
          });
        }
      });
    }
  });
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
