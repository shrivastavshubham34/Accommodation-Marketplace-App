import React, { Component } from "react";

import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  ModalFooter
} from "mdbreact";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class travelerSignUp extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      authFlag: false
    };
    //Bind the handlers to this class

    this.firstNameHandler = this.firstNameHandler.bind(this);
    this.lastNameHandler = this.lastNameHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.phoneHandler = this.phoneHandler.bind(this);
  }

  firstNameHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  lastNameHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };
  emailHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  passwordHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  phoneHandler = e => {
    this.setState({
      phone: e.target.value
    });
  };

  signUp = e => {
    e.preventDefault();
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/signup/traveler", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };
  render() {
    let redirectVar = null;
    if (this.state.authFlag) {
      redirectVar = <Redirect to="/login/traveler" />;
    }
    return (
      <div className="container">
        {redirectVar}
        <div class="card">
          <h5 class="card-header info-color white-text text-center py-4">
            <strong>Traveler Sign up</strong>
          </h5>

          <div class=" card-body px-lg-5 pt-0 ">
            <form class="text-center" method="POST">
              <div class="form-row">
                <div class="col">
                  <div class="md-form">
                    <Input
                      label="First Name"
                      group
                      name="firstName"
                      type="text"
                      validate
                      containerClass="mb-0"
                      onChange={this.firstNameHandler}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="md-form">
                    <Input
                      label="Last Name"
                      group
                      name="lastName"
                      type="text"
                      validate
                      containerClass="mb-0"
                      onChange={this.lastNameHandler}
                    />
                  </div>
                </div>
              </div>

              <div class="md-form">
                <Input
                  label="E-mail"
                  group
                  name="email"
                  type="email"
                  validate
                  containerClass="mb-0"
                  onChange={this.emailHandler}
                />
              </div>

              <div class="md-form">
                <Input
                  label="Password"
                  group
                  name="password"
                  type="password"
                  validate
                  containerClass="mb-0"
                  onChange={this.passwordHandler}
                />
                <small
                  id="materialRegisterFormPasswordHelpBlock"
                  class="form-text text-muted mb-4"
                >
                  At least 8 characters and 1 digit
                </small>
              </div>

              <div class="md-form">
                <Input
                  label="Phone number"
                  group
                  name="phone"
                  type="number"
                  validate
                  containerClass="mb-0"
                  onChange={this.phoneHandler}
                />
              </div>

              <div className="text-center mb-3">
                <Button
                  type="button"
                  gradient="blue"
                  rounded
                  onClick={this.signUp}
                  className="btn-block z-depth-1a  light-blue darken-3"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default travelerSignUp;
