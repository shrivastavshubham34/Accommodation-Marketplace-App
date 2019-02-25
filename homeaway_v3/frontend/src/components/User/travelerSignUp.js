import React, { Component } from "react";

import { Input, Button } from "mdbreact";
import Header from "../Header";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signup } from "../redux/action";

import { compose, graphql } from "react-apollo";

import { addUserMutation } from "../../queries/queries";

import axios from "axios";
import { Redirect } from "react-router";

import { RadioGroup, RadioButton } from "react-radio-buttons";

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    console.log("firstname is required");
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    console.log("lastname is required");
    errors.lastName = "Required";
  }

  if (!values.email) {
    console.log("email is required");
    errors.email = "Required";
  }

  if (!values.password) {
    console.log("password is required");
    errors.password = "Required";
  }
  if (!values.gender) {
    console.log("password is required");
    errors.gender = "Required";
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
    <Input containerClass="mb-0" label={label} {...input} group type={type} />

    {touched && error && (
      <span class={{ "font-size": "9px", color: "red" }}>{error}</span>
    )}
  </div>
);

let SignUpForm = props => {
  const { handleSubmit } = props;
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <div class=" card-body px-lg-5 pt-0 ">
        <form class="text-center" method="POST">
          <div class="form-row">
            <div class="col">
              <div class="md-form">
                <Field
                  label="First Name"
                  name="firstName"
                  type="text"
                  component={InputField}
                />
              </div>
            </div>
            <div class="col">
              <div class="md-form">
                <Field
                  label="Last Name"
                  name="lastName"
                  type="text"
                  component={InputField}
                />
              </div>
            </div>
          </div>

          <div class="md-form">
            <Field
              label="E-mail"
              name="email"
              type="email"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="Password"
              name="password"
              type="password"
              component={InputField}
            />

            <small
              id="materialRegisterFormPasswordHelpBlock"
              class="form-text text-muted mb-4"
            >
              At least 8 characters and 1 digit
            </small>
          </div>

          <Field
            name="gender"
            label="Gender"
            component={props => (
              <RadioGroup
                onChange={val => props.input.onChange(val)}
                horizontal
              >
                <RadioButton value="male" iconSize={20}>
                  Male
                </RadioButton>
                <RadioButton value="female" iconSize={20}>
                  Female
                </RadioButton>
                <RadioButton value="other" iconSize={20}>
                  Other
                </RadioButton>
              </RadioGroup>
            )}
          />

          <div className="text-center mb-3">
            <Button
              type="submit"
              gradient="blue"
              rounded
              className="btn-block z-depth-1a  light-blue darken-3"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </form>
  );
};

SignUpForm = reduxForm({
  form: "Travelersignup",
  validate
})(SignUpForm);

class travelerSignUp extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
  }
  handleSignUp = values => {
    console.log("Submitting the following values:");

    const data = {
      usertype: "traveler",
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      gender: values.gender
    };
    console.log(data);

    //this.props.dispatch(signup(200));
    //set the with credentials to true
    //make a post request with the user data

    this.props.addUserMutation({
      variables:{
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        usertype: data.usertype,
        password: data.password,
        gender: data.gender
      }
    });
  };

  render() {
    let redirectVar = null;
    if (this.props.signUpFlag) {
      redirectVar = <Redirect to="/login/owner" />;
    }
    return (
      <div className="container">
        {redirectVar}
        <Header />
        <div class="card">
          <h5 class="card-header info-color white-text text-center py-4">
            <strong>Traveler Sign up</strong>
          </h5>
          <SignUpForm onSubmit={this.handleSignUp} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signUpFlag: state.signup.signUpFlag
  };
};

export default compose(
  connect(mapStateToProps),
  graphql(addUserMutation, { name: "addUserMutation" })
)(travelerSignUp);
