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
  Select,
  SelectInput,
  SelectOption,
  SelectOptions,
  Fa
} from "mdbreact";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import { CountryDropdown } from "react-country-region-selector";
import Dropzone from "react-dropzone";
import Header from "../Header";

class addProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      strad: "",
      unit: "",
      zip: "",
      headline: "",
      propdesc: "",
      bedroom: "",
      accomodate: "",
      bathroom: "",
      baserate: "",
      minstay: "",
      proptype: "",
      startDate: "",
      endDate: "",
      currency: ""
    };
  }
  selectCountry(val) {
    this.setState({ country: val });
  }

  imageDrop = (files, rejectedFiles) => {
    console.log(files);
    if (files.length > 5 || files.length < 2) alert("must be between 2 and 5");
  };

  handleProp = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addProp = e => {
    e.preventDefault();
    const data = {
      city: this.state.city,
      country: this.state.country,
      strad: this.state.strad,
      zip: this.state.zip,
      headline: this.state.headline,
      propdesc: this.state.propdesc,
      bedroom: this.state.bedroom,
      accomodate: this.state.accomodate,
      bathroom: this.state.bathroom,
      baserate: this.state.baserate,
      minstay: this.state.minstay,
      proptype: this.state.proptype,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      unit: this.state.unit,
      currency: this.state.currency,
      email: cookie.load("owner")
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/owner/addprop", data).then(response => {
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
    const { country } = this.state;

    let redirectVar = null;
    if (!cookie.load("owner")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div class="container">
        {redirectVar}
        <Header />
        <Progress value={25} />

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
                              <CountryDropdown
                                defaultOptionLabel="Select a country."
                                value={country}
                                onChange={val => this.selectCountry(val)}
                                classes={" form-control"}
                                id="country"
                              />

                              <Input
                                label="City"
                                icon="fa-map"
                                group
                                onChange={this.handleProp}
                                type="text"
                                id="city"
                                validate
                                error="wrong"
                                success="right"
                              />
                              <Input
                                label="Street Address"
                                icon="fa-map-signs"
                                group
                                onChange={this.handleProp}
                                type="text"
                                id="strad"
                                validate
                                error="wrong"
                                success="right"
                              />

                              <Input
                                label="Unit, Suite, Building, etc."
                                icon="fa-home"
                                group
                                onChange={this.handleProp}
                                type="text"
                                validate
                                id="unit"
                                error="wrong"
                                success="right"
                              />

                              <Input
                                label="Zip Code"
                                icon="fa-map-pin"
                                group
                                onChange={this.handleProp}
                                type="number"
                                validate
                                id="zip"
                                error="wrong"
                                success="right"
                              />
                            </div>
                            <div className="text-center">
                              <Button
                                color="primary"
                                data-toggle="modal"
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
                                        Changes saved!
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
                          <Input
                            label="Headline"
                            group
                            type="text"
                            validate
                            onChange={this.handleProp}
                            id="headline"
                            required
                            error="wrong"
                            success="right"
                          />

                          <Input
                            type="textarea"
                            rows="3"
                            onChange={this.handleProp}
                            id="propdesc"
                            label="Property Description"
                          />

                          <select
                            class="custom-select"
                            onChange={this.handleProp}
                            value={this.state.proptype}
                            id="proptype"
                          >
                            <option selected>Property Type</option>
                            <option value="House">House</option>
                            <option value="Hotel Suite">Hotel Suite</option>
                            <option value="Hostel">Hostel</option>
                            <option value="Cottage">Cottage</option>
                            <option value="Farmhouse">Farmhouse</option>
                          </select>

                          <Input
                            label="Bedrooms"
                            group
                            onChange={this.handleProp}
                            id="bedroom"
                            type="number"
                            validate
                            error="wrong"
                            success="right"
                          />
                          <Input
                            label="Accommodates"
                            group
                            type="number"
                            onChange={this.handleProp}
                            id="accomodate"
                            validate
                            error="wrong"
                            success="right"
                          />

                          <Input
                            label="Bathrooms"
                            step="0.5"
                            group
                            onChange={this.handleProp}
                            id="bathroom"
                            type="number"
                            validate
                            error="wrong"
                            success="right"
                          />
                        </div>
                        <div className="text-center">
                          <Button outline color="secondary">
                            Save <Fa icon="paper-plane-o" className="ml-1" />
                          </Button>
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
                        Showcase your property’s best features (no pets or
                        people, please).
                      </p>
                      <div className="grey-text">
                        <Dropzone
                          onDrop={this.imageDrop}
                          disablePreview={false}
                          multiple
                          className="text-center border border-danger"
                        >
                          Click here to Add or Drop Images
                        </Dropzone>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <button
                          className="btn btn-outline-purple"
                          type="submit"
                        >
                          Send
                          <i className="fa fa-paper-plane-o ml-2" />
                        </button>
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
                                <DateRangePicker
                                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                  onDatesChange={({ startDate, endDate }) =>
                                    this.setState({ startDate, endDate })
                                  } // PropTypes.func.isRequired,
                                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                  onFocusChange={focusedInput =>
                                    this.setState({ focusedInput })
                                  } // PropTypes.func.isRequired,
                                />
                              </div>
                              <select
                                class="custom-select"
                                onChange={this.handleProp}
                                value={this.state.currency}
                                id="currency"
                              >
                                <option selected>Currency</option>
                                <option value="SGD">
                                  Singapore Dollar (SGD)
                                </option>
                                <option value="EUR">Euros (EUR)</option>
                                <option value="GBP">
                                  Great British Pound (GBP)
                                </option>
                                <option value="CAD">
                                  Canadian Dollar (CAD)
                                </option>
                                <option value="USD">US Dollar (USD)</option>
                              </select>
                              <Input
                                label="Base Rate"
                                icon="fa-map-pin"
                                group
                                onChange={this.handleProp}
                                id="baserate"
                                type="number"
                                validate
                                error="wrong"
                                success="right"
                              />
                              <Input
                                label="Minimum stay (nights)"
                                icon="fa-map-pin"
                                group
                                type="number"
                                validate
                                onChange={this.handleProp}
                                id="minstay"
                                error="wrong"
                                success="right"
                                min="1"
                                step="1"
                              />
                            </div>
                            <div className="text-center">
                              <Button color="primary" onClick={this.addProp}>
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
      </div>
    );
  }
}

export default addProperty;
