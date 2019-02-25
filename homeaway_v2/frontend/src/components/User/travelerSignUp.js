import React, { Component } from "react";

import { Input, Button } from "mdbreact";
import Header from "../Header";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signup } from "../redux/action";

import axios from "axios";
import { Redirect } from "react-router";

import {
  RadioGroup,
  RadioButton
} from "react-radio-buttons";

const validate = values => {
  const errors = {};

  if (!values.firstname) {
    console.log("firstname is required");
    errors.firstname = "Required";
  }

  if (!values.lastname) {
    console.log("email is required");
    errors.lastname = "Required";
  }

  if (!values.email) {
    console.log("email is required");
    errors.email = "Required";
  }

  if (!values.password) {
    console.log("password is required");
    errors.password = "Required";
  }
  if (!values.phone) {
    console.log("password is required");
    errors.phone = "Required";
  }
  if (!values.aboutme) {
    console.log("password is required");
    errors.aboutme = "Required";
  }
  if (!values.city) {
    console.log("password is required");
    errors.city = "Required";
  }
  if (!values.country) {
    console.log("password is required");
    errors.country = "Required";
  }
  if (!values.company) {
    console.log("password is required");
    errors.company = "Required";
  }
  if (!values.school) {
    console.log("password is required");
    errors.school = "Required";
  }

  if (!values.hometown) {
    console.log("password is required");
    errors.hometown = "Required";
  }

  if (!values.language) {
    console.log("password is required");
    errors.language = "Required";
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

    {touched && error && <span>{error}</span>}
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

          <div class="md-form">
            <Field
              label="Phone number"
              name="phone"
              type="number"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="About Me"
              name="aboutme"
              type="textarea"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="City"
              name="city"
              type="text"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="Country"
              name="country"
              type="text"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="Company"
              name="company"
              type="text"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="School"
              name="school"
              type="text"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="Hometown"
              name="hometown"
              type="text"
              component={InputField}
            />
          </div>

          <div class="md-form">
            <Field
              label="Language"
              name="language"
              type="text"
              component={InputField}
            />
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
  
  handleSignUp = values => {
    console.log("Submitting the following values:");

    const data = {
      usertype: "traveler",
      firstname: values.firstname,
      lastname: values.lastname,
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

    this.props.dispatch(signup(200));
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://18.217.191.163:3001/signup", data).then(response => {
      console.log("Status Code : ", response.status);

      this.props.dispatch(signup(response.status));
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

export default connect(mapStateToProps)(travelerSignUp);
