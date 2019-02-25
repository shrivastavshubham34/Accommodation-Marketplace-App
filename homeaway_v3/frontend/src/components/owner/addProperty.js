import React, { Component } from "react";
import {
  Row,
  Col,
  Progress,
  Button,
  Container,
  Input,
  Card,
  CardBody,
  Fa
} from "mdbreact";
import FormData from "form-data";

import { propadd } from "../redux/action";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../redux/action";

import axios from "axios";
import { Redirect } from "react-router";

import { CountryDropdown } from "react-country-region-selector";
import Dropzone from "react-dropzone";
import Header from "../Header";
import DateRangePickerField from "./DateRangePickerField";

const imageDrop = (files, rejectedFiles) => {
  const url = "http://localhost:3001/uploadImg/";

  console.log(files);
  if (files.length > 5 || files.length < 2)
    alert("images must be between 2 and 5");
  else {
    /* for (var i = 0; i < files.length; i++) {
      var file = files[i];
      data.append("file" + i, file);
    } */
    let data = new FormData();
    files.forEach(file => {
      data.append(file.name, file);
    });
    console.log("data");
    console.log(data);

    axios.post(url, data).then(response => {
      //update the state with the response data
      console.log("response.data.results");
    });
  }
};

const validate = values => {
  const errors = {};

  if (!values.country) {
    console.log("email is required");
    errors.country = "Required";
  }

  if (!values.city) {
    console.log("password is required");
    errors.city = "Required";
  }

  if (!values.strad) {
    errors.strad = "Required";
  }

  if (!values.unit) {
    errors.unit = "Required";
  }
  if (!values.zip) {
    errors.zip = "Required";
  }
  if (!values.headline) {
    errors.headline = "Required";
  }
  if (!values.propdesc) {
    errors.propdesc = "Required";
  }

  if (!values.proptype) {
    console.log("proptype empty");
    errors.proptype = "Required";
  }

  if (!values.bedroom) {
    errors.bedroom = "Required";
  }

  if (!values.accomodate) {
    errors.accomodate = "Required";
  }

  if (!values.bathroom) {
    errors.bathroom = "Required";
  }

  if (!values.date) {
    console.log("date empty");
    errors.date = "Required";
  }

  if (!values.currency) {
    console.log("curr empty");
    errors.currency = "Required";
  }

  if (!values.baserate) {
    errors.baserate = "Required";
  }

  if (!values.minstay) {
    errors.minstay = "Required";
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

  var progress = 25;
  return (
    <form onSubmit={handleSubmit}>
      <Progress value={progress} />
      <Row className="pt-3">
        <Col md="2">
          <ul
            class="nav nav-pills mb-3 flex-column"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-loc-tab"
                data-toggle="pill"
                href="#pills-loc"
                role="tab"
                aria-controls="pills-loc"
                aria-selected="true"
              >
                Location
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-details-tab"
                data-toggle="pill"
                href="#pills-details"
                role="tab"
                aria-controls="pills-details"
                aria-selected="false"
              >
                Details
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-photos-tab"
                data-toggle="pill"
                href="#pills-photos"
                role="tab"
                aria-controls="pills-photos"
                aria-selected="false"
              >
                Photos
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-pricing-tab"
                data-toggle="pill"
                href="#pills-pricing"
                role="tab"
                aria-controls="pills-pricing"
                aria-selected="false"
              >
                Pricing
              </a>
            </li>
          </ul>
        </Col>
        <Col>
          <div class="tab-content pt-2 pl-1" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-loc"
              role="tabpanel"
              aria-labelledby="pills-loc-tab"
            >
              <Container>
                <Row>
                  <Col md="7">
                    <Card>
                      <CardBody>
                        <form>
                          <div className="grey-text">
                            <Field
                              name="country"
                              component={props => (
                                <CountryDropdown
                                  defaultOptionLabel="Select a country."
                                  value={props.input.value}
                                  //onChange={val => this.selectCountry(val)}
                                  onChange={val => props.input.onChange(val)}
                                  classes={" form-control"}
                                  id="country"
                                />
                              )}
                            />

                            <Field
                              name="city"
                              type="text"
                              label="City"
                              component={InputField}
                            />

                            <Field
                              name="strad"
                              type="text"
                              label="Street Address"
                              component={InputField}
                            />

                            <Field
                              name="unit"
                              type="text"
                              label="Unit, Suite, Building, etc."
                              component={InputField}
                            />

                            <Field
                              name="zip"
                              type="number"
                              label="Zip Code"
                              component={InputField}
                            />
                          </div>
                          <div className="text-center">
                            <Button
                              color="primary"
                              data-toggle="modal"
                              onClick={(progress += 25)}
                              data-target="#centralModalSm"
                            >
                              Save
                            </Button>

                            <div
                              class="modal fade"
                              id="centralModalSm"
                              tabindex="-1"
                              role="dialog"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div
                                class="modal-dialog modal-side modal-top-right"
                                role="document"
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Changes saved! Please click on next tab!
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
            <div
              class="tab-pane fade"
              id="pills-details"
              role="tabpanel"
              aria-labelledby="pills-details-tab"
            >
              <Container>
                <Card>
                  <CardBody>
                    <form>
                      <p className="h5 text-center mb-4">
                        Describe your property
                      </p>
                      <div className="grey-text">
                        <Field
                          name="headline"
                          type="text"
                          label="Headline"
                          component={InputField}
                        />

                        <Field
                          type="textarea"
                          name="propdesc"
                          label="Property Description"
                          component={InputField}
                        />

                        <Field
                          name="proptype"
                          component="select"
                          class="custom-select"
                        >
                          <option selected>Property Type</option>
                          <option value="House">House</option>
                          <option value="Hotel Suite">Hotel Suite</option>
                          <option value="Hostel">Hostel</option>
                          <option value="Cottage">Cottage</option>
                          <option value="Farmhouse">Farmhouse</option>
                        </Field>

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
                          step={0.5}
                          name="bathroom"
                          type="number"
                          component={InputField}
                        />
                      </div>
                      <div className="text-center">
                        <Button
                          color="primary"
                          data-toggle="modal"
                          data-target="#centralModalSm2"
                        >
                          Save
                        </Button>

                        <div
                          class="modal fade"
                          id="centralModalSm2"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel2"
                          aria-hidden="true"
                        >
                          <div
                            class="modal-dialog modal-side modal-top-right"
                            role="document"
                          >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel2">
                                  Changes saved! Please click on next tab!
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Container>
            </div>
            <div
              class="tab-pane fade"
              id="pills-photos"
              role="tabpanel"
              aria-labelledby="pills-photos-tab"
            >
              <div className="card mx-xl-5">
                <div className="card-body">
                  <form>
                    <p className="h4 text-center py-4">
                      Add up to 5 photos of your property
                    </p>
                    <p>
                      Showcase your property’s best features (no pets or people,
                      please).
                    </p>
                    <div className="grey-text">
                      <Dropzone
                        onDrop={imageDrop}
                        disablePreview={false}
                        multiple
                        className="text-center border border-danger"
                        name="propertyPic"
                      >
                        Click here to Add or Drop Images
                      </Dropzone>
                    </div>
                    <div className="text-center py-4 mt-3">
                      <button className="btn btn-outline-purple" type="submit">
                        Send
                        <i className="fa fa-paper-plane-o ml-2" />
                      </button>

                      <div
                        class="modal fade"
                        id="centralModalSm"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-side modal-top-right"
                          role="document"
                        >
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Changes saved! Please click on next tab!
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-pricing"
              role="tabpanel"
              aria-labelledby="pills-pricing-tab"
            >
              <Container>
                <Row>
                  <Col md="7">
                    <Card>
                      <CardBody>
                        <p className="h4 text-center py-4">
                          How much do you want to charge?
                        </p>
                        <form>
                          <div className="grey-text">
                            <div class="text-center pb-3">
                              <Field
                                name="date"
                                component={DateRangePickerField}
                              />
                            </div>

                            <Field
                              name="currency"
                              component="select"
                              class="custom-select"
                            >
                              <option selected>Currency</option>
                              <option value="SGD">
                                Singapore Dollar (SGD)
                              </option>
                              <option value="EUR">Euros (EUR)</option>
                              <option value="GBP">
                                Great British Pound (GBP)
                              </option>
                              <option value="CAD">Canadian Dollar (CAD)</option>
                              <option value="USD">US Dollar (USD)</option>
                            </Field>

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
                          </div>
                          <div className="text-center">
                            <Button
                              color="primary"
                              onClick={this.addProp}
                              type="submit"
                            >
                              Save and Submit
                            </Button>
                          </div>
                        </form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
    </form>
  );
};

SignInForm = reduxForm({
  form: "AddProperty",
  //validate,
  destroyOnUnmount: false
})(SignInForm);

class addProperty extends Component {
  constructor(props) {
    super(props);
  }

  addProp = values => {
    console.log("Submitting the following values:");

    const data = {
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
      startDate: values.date.startDate.format("YYYY-MM-DD"),
      endDate: values.date.endDate.format("YYYY-MM-DD"),
      unit: values.unit,
      currency: values.currency,
      email: sessionStorage.getItem("email")
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data

    axios.defaults.headers.common = {
      Authorization: "JWT " + sessionStorage.getItem("token")
    };

    axios.post("http://localhost:3001/owner/addprop", data).then(response => {
      console.log("Status Code : ", response.status);
      this.props.dispatch(propadd(response.status));
    });
  };

  render() {
    let redirectVar = null;
    if (this.props.addPropCheck) {
      redirectVar = <Redirect to="/owner/viewProperty" />;
    }
    return (
      <div class="container">
        {redirectVar}
        <Header />

        <SignInForm onSubmit={this.addProp} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addPropCheck: state.property.addPropCheck
  };
};

//export Property Adding Component
export default connect(mapStateToProps)(addProperty);
