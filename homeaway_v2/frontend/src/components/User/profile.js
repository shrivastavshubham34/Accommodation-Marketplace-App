import React, { Component } from "react";
import { Row, Col, Input } from "mdbreact";

import { Field, reduxForm } from "redux-form";
import Header from "../Header";

import axios from "axios";
import { connect } from "react-redux";
import { viewprofile } from "../redux/action";

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    console.log("firstName is required");
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    console.log("email is required");
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
  if (!values.phone) {
    console.log("phone is required");
    errors.phone = "Required";
  }
  if (!values.aboutme) {
    console.log("aboutme is required");
    errors.aboutme = "Required";
  }
  if (!values.city) {
    console.log("city is required");
    errors.city = "Required";
  }
  if (!values.country) {
    console.log("country is required");
    errors.country = "Required";
  }
  if (!values.company) {
    console.log("company is required");
    errors.company = "Required";
  }
  if (!values.school) {
    console.log("school is required");
    errors.school = "Required";
  }

  if (!values.hometown) {
    console.log("hometown is required");
    errors.hometown = "Required";
  }

  if (!values.language) {
    console.log("language is required");
    errors.language = "Required";
  }

  if (!values.gender) {
    console.log("gender is required");
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

let ProfileTab = props => {
  const { handleSubmit, viewprofile} = props;

  console.log(props);

  var data = {
    email: sessionStorage.getItem("email")
  };

  axios.defaults.withCredentials = true;
  axios.defaults.headers.common = {
    Authorization: "JWT " + sessionStorage.getItem("token")
  };
  axios.post("http://18.217.191.163:3001/viewprofile", data).then(response => {
    console.log("Status Code : ", response.status);
    console.log(response.data.user);
    viewprofile(response.status, response.data);
  });

  return (
    <form class="text-center border border-light " onSubmit={handleSubmit}>
      <p class="h4 mb-4">Profile</p>

      <div class="form-row mb-4 grey-text">
        <div class="col">
          <Field
            label="First Name"
            name="firstName"
            type="text"
            component={InputField}
          />
        </div>
        <div class="col">
          <Field
            label="Last Name"
            name="lastName"
            type="text"
            component={InputField}
          />
        </div>
      </div>
      <Field label="E-mail" name="email" type="email" component={InputField} />
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
        <Field label="City" name="city" type="text" component={InputField} />
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

      <div>
        <label>Sex</label>
        <div class="radio-inline">
          <label>
            <Field name="gender" component="input" type="radio" value="male" />{" "}
            Male
          </label>
          <label>
            <Field
              name="gender"
              component="input"
              type="radio"
              value="female"
            />{" "}
            Female
          </label>
          <label>
            <Field name="gender" component="input" type="radio" value="other" />{" "}
            Other
          </label>
        </div>
      </div>

      <div class="md-form">
        <button class="btn btn-info my-4 btn-block" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

ProfileTab = reduxForm({
  form: "profileview",
  enableReinitialize: true,
  validate
})(ProfileTab);

ProfileTab = connect(
  state => ({
    initialValues: state.profile.data.user // pull initial values from account reducer
  }),
  { viewprofile } // bind account loading action creator
)(ProfileTab);

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
    axios.post("http://18.217.191.163:3001/update", data).then(response => {
      console.log("Status Code : ", response.status);

      //      this.props.dispatch(signup(response.status));
    });
  };

  render() {
    
      
      return (
        <div>
        <Header />
        <div className="container pt-4">
        
          <Row>
            <Col md="6" />
            <ProfileTab onSubmit={this.handleSignUp} />
          </Row>
        </div>
        </div>  
      );
    } 
      }


export default profile;
