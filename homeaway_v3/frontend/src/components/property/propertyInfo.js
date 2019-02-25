import React, { Component } from "react";
import { Row, Col, Input } from "mdbreact";

import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { Redirect } from "react-router";
import { viewproperty } from "../redux/action";

const validate = values => {
  const errors = {};

  if (!values.city) {
    console.log("city is required");
    errors.city = "Required";
  }

  if (!values.country) {
    console.log("country is required");
    errors.country = "Required";
  }

  if (!values.strad) {
    console.log("strad is required");
    errors.strad = "Required";
  }

  if (!values.zip) {
    console.log("zip is required");
    errors.zip = "Required";
  }
  if (!values.headline) {
    console.log("headline is required");
    errors.headline = "Required";
  }
  if (!values.propdesc) {
    console.log("propdesc is required");
    errors.propdesc = "Required";
  }
  if (!values.bedroom) {
    console.log("bedroom is required");
    errors.bedroom = "Required";
  }
  if (!values.accomodate) {
    console.log("accomodate is required");
    errors.accomodate = "Required";
  }
  if (!values.bathroom) {
    console.log("bathroom is required");
    errors.bathroom = "Required";
  }
  if (!values.baserate) {
    console.log("baserate is required");
    errors.baserate = "Required";
  }

  if (!values.minstay) {
    console.log("minstay is required");
    errors.minstay = "Required";
  }

  if (!values.proptype) {
    console.log("proptype is required");
    errors.proptype = "Required";
  }

  if (!values.startDate) {
    console.log("startDate is required");
    errors.startDate = "Required";
  }
  if (!values.endDate) {
    console.log("endDate is required");
    errors.endDate = "Required";
  }

  if (!values.unit) {
    console.log("unit is required");
    errors.unit = "Required";
  }
  if (!values.currency) {
    console.log("currency is required");
    errors.currency = "Required";
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

let Propertydetails = props => {
  const {
    handleSubmit,
    viewproperty,
    pristine,
    propId,
    reset,
    submitting
  } = props;

  console.log(props);

  const url = "http://localhost:3001/property/" + propId;
  console.log(url);

  axios.defaults.withCredentials = true;
  axios.defaults.headers.common = {
    Authorization: "JWT " + sessionStorage.getItem("token")
  };


  axios.get(url).then(response => {
    //update the state with the response data
    console.log(response.data.results);

    viewproperty(response.status, response.data.results[0]);
  });
  return (
    <form class="text-center border border-light p-5" onSubmit={handleSubmit}>
      <p class="h4 mb-4">Property</p>

      <Field
        label="Name/Headline"
        type="text"
        name="headline"
        component={InputField}
      />

      <Field
        label="Unit, Suite, Building, etc."
        type="text"
        name="unit"
        component={InputField}
      />

      <Field
        label="Street Address"
        type="text"
        name="strad"
        component={InputField}
      />

      <Field label="City" type="text" name="city" component={InputField} />

      <Field
        label="Country"
        type="text"
        name="country"
        component={InputField}
      />

      <Field label="Zip Code" type="number" name="zip" component={InputField} />

      <Field
        label="Property Description"
        type="textarea"
        name="propdesc"
        component={InputField}
      />

      <Field
        label="Property Type"
        name="proptype"
        type="text"
        component={InputField}
      />

      <Field
        label="Bedrooms"
        name="bedroom"
        type="number"
        component={InputField}
      />

      <Field
        label="Accommodates"
        type="number"
        name="accomodate"
        component={InputField}
      />

      <Field
        label="Bathrooms"
        name="bathroom"
        type="number"
        component={InputField}
      />

      <div class="form-row mb-4 grey-text">
        <div class="col">
          <Field
            label="Availablity Start Date"
            type="text"
            name="startDate"
            component={InputField}
          />
        </div>
        <div class="col">
          <Field
            label="Availablity End Date"
            type="text"
            name="endDate"
            component={InputField}
          />
        </div>
      </div>

      <Field
        label="Currency"
        name="currency"
        type="text"
        component={InputField}
      />

      <Field
        label="Base Rate"
        name="baserate"
        type="number"
        component={InputField}
      />

      <Field
        label="Minimum stay (nights)"
        type="number"
        name="minstay"
        component={InputField}
      />

      <button class="btn btn-info my-4 btn-block" type="submit">
        Update
      </button>
    </form>
  );
};

Propertydetails = reduxForm({
  form: "propertydetails",
  enableReinitialize: true,
  validate
})(Propertydetails);

Propertydetails = connect(
  state => ({
    initialValues: state.property.data // pull initial values from account reducer
  }),
  { viewproperty } // bind account loading action creator
)(Propertydetails);

class propertyInfo extends Component {
  constructor(props) {
    super(props);
  }
  updateProperty = values => {
    console.log("Submitting the following values:");

    const data = {
      _id: values._id,
      city: values.city,
      country: values.country,
      strad: values.strad,
      zip: values.zip,
      headline: values.headline,
      propdesc: values.propdesc,
      bedroom: values.bedroom,
      accomodate: values.accomodate,
      bathroom: values.bathroom,
      baserate: values.baserate,
      minstay: values.minstay,
      proptype: values.proptype,
      startDate: values.startDate,
      endDate: values.endDate,
      unit: values.unit,
      currency: values.currency,
      email: sessionStorage.getItem("email")
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data

    axios
      .post("http://localhost:3001/owner/updateprop", data)
      .then(response => {
        console.log("Status Code : ", response.status);
      });
  };

  render() {
    const { propId } = this.props.match.params;
    let redirectVar = null;
    if (!sessionStorage.getItem("email")) {
      redirectVar = <Redirect to="/home" />;
    }

    console.log("0");
    return (
      <div className="container pt-4">
        {redirectVar}
        <Row>
          <Col md="3">
            <div class="text-center">
              <img
                src="https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg"
                class="avatar rounded-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <input type="file" class="text-center center-block file-upload" />
            </div>
          </Col>

          <Col md="6">
            <Propertydetails onSubmit={this.updateProperty} propId={propId} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default propertyInfo;
