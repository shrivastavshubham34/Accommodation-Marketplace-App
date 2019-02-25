import React, { Component } from "react";
import Header from "../Header";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../redux/action";
import axios from "axios";

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
    <Input label={label} {...input} group type={type} />

    {touched && error && <span>{error}</span>}
  </div>
);

let SignInForm = props => {
  const { handleSubmit } = props;
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        label="Email address"
        component={InputField}
      />

      <Field
        name="password"
        label="Password"
        type="password"
        component={InputField}
      />

      <div className="text-center mb-4 mt-5 ">
        <Button type="submit" className="btn-block z-depth-2 yellow darken-4">
          Log in
        </Button>
      </div>
    </form>
  );
};

SignInForm = reduxForm({
  form: "OwnersignIn",
  validate
})(SignInForm);

class ownerLogin extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component

    this.notificationDOMRef = React.createRef();

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn = values => {
    console.log("Submitting the following values:");
    console.log(`Email: ${values.email}`);
    console.log(`Password: ${values.password}`);

    const data = {
      email: values.email,
      password: values.password,
      usertype: "owner"
    };
    console.log(data);

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

    //set the with credentials to true
  };

  render() {
    //console.log(this.props);
    let redirectVar = null;
    if (this.props.authFlag && this.props.usertype === "owner") {
      this.props.history.push("/home");
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        <ReactNotification ref={this.notificationDOMRef} />

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
                  <SignInForm onSubmit={this.handleSignIn} />
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

const mapStateToProps = state => {
  return {
    authFlag: state.login.authFlag,
    usertype: state.login.usertype
  };
};

//export Login Component

export default connect(mapStateToProps)(ownerLogin);
