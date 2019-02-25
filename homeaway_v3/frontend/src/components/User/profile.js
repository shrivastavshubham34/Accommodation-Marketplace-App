import React, { Component } from "react";
import { Row, Col, Input } from "mdbreact";
import Header from "../Header";
import { Field, reduxForm } from "redux-form";
import jwtDecode from "jwt-decode";

import { compose, graphql } from "react-apollo";
import axios from "axios";
import { connect } from "react-redux";
import { viewprofile } from "../redux/action";
import ProfileTab from "./profileTab";

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio3: false,
      flag: 1
    };
  }

  updateProfile = values => {
    console.log("Submitting the following values:");

    const data = {
      _id: values._id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      aboutme: values.aboutme,
      city: values.city,
      country: values.country,
      company: values.company,
      school: values.school,
      hometown: values.hometown,
      language: values.language,
      gender: values.gender
    };
    console.log(data);

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/update", data).then(response => {
      console.log("Status Code : ", response.status);

      //      this.props.dispatch(signup(response.status));
    });
  };

  render() {
    var decoded = jwtDecode(sessionStorage.getItem("token"));
    console.log(sessionStorage.getItem("token"));
    return (
      <div>
        <Header />

        <div className="container">
          <Row>
            <Col md="6">
              <ProfileTab id={decoded.id} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default profile;
