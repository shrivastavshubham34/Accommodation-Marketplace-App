import React, { Component } from "react";
import Header from "../Header";

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

class travelerLogin extends Component {
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
    this.submitTravelerLogin = this.submitTravelerLogin.bind(this);
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
  submitTravelerLogin = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/traveler/login", data).then(response => {
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
    if (cookie.load("traveler")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <Header />
        <div class="jumbotron jumbotron-fluid text-center">
          <div class="container">
            <h1 class="h1-reponsive mb-4 mt-2 blue-text font-bold">
              Sign in to HomeAway
            </h1>
            <div>
              <Container>
                <section className="form-elegant">
                  <Row className="d-flex justify-content-center">
                    <Col md="5" className="centerForm">
                      <Card>
                        <CardBody className="mx-4">
                          <form method="POST">
                            <div className="text-center">
                              <h3 className="dark-grey-text mb-5">
                                <strong>Sign in</strong>
                              </h3>
                            </div>
                            <Input
                              label="Your email"
                              group
                              type="text"
                              name="email"
                              validate
                              error="wrong"
                              success="right"
                              onChange={this.emailChangeHandler}
                            />
                            <Input
                              label="Your password"
                              group
                              name="password"
                              type="password"
                              validate
                              containerClass="mb-0"
                              onChange={this.passwordChangeHandler}
                            />
                            <div className="text-center mb-3">
                              <Button
                                type="submit"
                                gradient="blue"
                                rounded
                                onClick={this.submitTravelerLogin}
                                className="btn-block z-depth-1a  light-blue darken-3"
                              >
                                Sign in
                              </Button>
                            </div>
                          </form>
                        </CardBody>
                        <ModalFooter className="mx-5 pt-3 mb-1">
                          <p className="font-small grey-text d-flex justify-content-end">
                            Not a member?{" "}
                            <a
                              href="/signUp/traveler"
                              className="blue-text ml-1"
                            >
                              {" "}
                              Sign Up
                            </a>
                          </p>
                        </ModalFooter>
                      </Card>
                    </Col>
                  </Row>
                </section>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default travelerLogin;
