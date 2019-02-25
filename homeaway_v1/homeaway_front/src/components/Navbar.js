import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  //handle logout to destroy the cookie

  render() {
    let redirectVar = null;

    //if Cookie is set go to homepage

    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      redirectVar = <Redirect to="/home" />;
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      redirectVar = <Redirect to="/home" />;
    }
    return <div>{redirectVar}</div>;
  }
}

export default Navbar;
