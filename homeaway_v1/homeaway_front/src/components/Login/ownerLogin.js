import React, { Component } from "react";
import Header from "../Header";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  Card,
  CardBody,
  ModalFooter
} from "mdbreact";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class ownerLogin extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/owner/login", data).then(response => {
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
    if (cookie.load("owner")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <Header />
        <div className="container pt-4">
          <div className="row  ">
            <Col md="6" sm="6" pr="0" mr="0" className="bordering">
              <img
                src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"
                height="60%"
              />
            </Col>

            <Col md="4" ml="0" pl="0">
              <Card>
                <div className="header pt-3 grey lighten-2">
                  <Row className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Owner Login
                    </h3>
                  </Row>
                </div>
                <CardBody className="mx-4 mt-4">
                  <form>
                    <Input
                      label="Email address"
                      group
                      type="text"
                      validate
                      onChange={this.emailChangeHandler}
                    />
                    <Input
                      label="Password"
                      group
                      type="password"
                      validate
                      onChange={this.passwordChangeHandler}
                      containerClass="mb-0"
                    />
                    <div className="text-center mb-4 mt-5 ">
                      <Button
                        type="button"
                        className="btn-block z-depth-2 yellow darken-4"
                        onClick={this.submitLogin}
                      >
                        Log in
                      </Button>
                    </div>
                  </form>
                  <p className="font-small grey-text d-flex justify-content-center">
                    Don't have an account?{" "}
                    <a
                      href="/signUp/owner"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      {" "}
                      Sign up
                    </a>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default ownerLogin;
