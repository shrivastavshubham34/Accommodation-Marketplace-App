import React, { Component } from "react";
import Header from "../Header";
import axios from "axios";
import { login } from "../redux/action";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
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

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Redirect } from "react-router";

const validate = values => {
  const errors = {};

  if (!values.email) {
    console.log("email is required");
    errors.email = "Required";
  } else if (!/^.+@.+$/i.test(values.email)) {
    console.log("email is invalid");
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    console.log("password is required");
    errors.password = "Required";
  }

  return errors;
};

const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <Input label={label} {...input} group type={type} containerClass="mb-0" />

    {touched && error && <span>{error}</span>}
  </div>
);

let SignInForm = props => {
  const { handleSubmit } = props;
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center">
        <h3 className="dark-grey-text mb-5">
          <strong>Sign in</strong>
        </h3>
      </div>

      <Field
        name="email"
        type="email"
        label="Your email"
        component={InputField}
      />

      <Field
        name="password"
        type="password"
        label="Your password"
        component={InputField}
      />

      <div className="text-center mb-3">
        <Button
          type="submit"
          gradient="blue"
          rounded
          className="btn-block z-depth-1a  light-blue darken-3"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

SignInForm = reduxForm({
  form: "TravelerSignIn",
  validate
})(SignInForm);

class travelerLogin extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);

    this.notificationDOMRef = React.createRef();
  }

  handleSignIn = values => {
    console.log("Submitting the following values:");
    console.log(`Email: ${values.email}`);
    console.log(`Password: ${values.password}`);

    const data = {
      email: values.email,
      password: values.password,
      usertype: "traveler"
    };

    console.log("Sign In values:" + data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/login", data).then(response => {
      console.log("Status Code : ", response.status);
      console.log("Data Received : ", response.data);

      if (response.status === 201) {
        this.notificationDOMRef.current.addNotification({
          title: "Does not exist",
          message: "Email does not exist",
          type: "warning",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      } else if (response.status === 202) {
        this.notificationDOMRef.current.addNotification({
          title: "Invalid Credentials",
          message: "Value entered is not correct",
          type: "danger",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      } else {
        sessionStorage.clear();
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("usertype", response.data.usertype);

        this.props.dispatch(
          login(response.data, response.status, this.props.history)
        );
      }
    });
  };

  render() {
    let redirectVar = null;
    if (this.props.authFlag && this.props.usertype === "traveler") {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        <ReactNotification ref={this.notificationDOMRef} />

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
                          <SignInForm onSubmit={this.handleSignIn} />
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

const mapStateToProps = state => {
  return {
    authFlag: state.login.authFlag,
    usertype: state.login.usertype
  };
};

//export Login Component
export default connect(mapStateToProps)(travelerLogin);
