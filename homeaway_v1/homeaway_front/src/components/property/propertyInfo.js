import React, { Component } from "react";
import { Row, Col, Input } from "mdbreact";

import { DateRangePicker } from "react-dates";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class propertyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      strad: "",
      unit: "",
      zip: "",
      currency: "",
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
      flag: 0
    };
  }

  componentWillMount() {
    const { propId } = this.props.match.params;
    const url = "http://localhost:3001/property/" + propId;
    console.log(url);
    axios.get(url).then(response => {
      //update the state with the response data
      console.log(response.data);
      var output = response.data[0];
      this.setState({
        city: output.city,
        country: output.country,
        strad: output.strad,
        unit: output.unit,
        zip: output.zip,
        headline: output.headline,
        propdesc: output.propdesc,
        bedroom: output.bedroom,
        currency: output.currency,
        accomodate: output.accomodate,
        bathroom: output.bathroom,
        baserate: output.baserate,
        minstay: output.minstay,
        proptype: output.proptype,
        startDate: output.startDate,
        endDate: output.endDate
      });
    });
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  handleProp = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  chanFlag = e => {
    if (this.state.flag === 0) this.setState({ flag: 1 });
    else this.setState({ flag: 0 });
  };

  render() {
    if (this.state.flag == 0) {
      console.log("0");
      return (
        <div className="container pt-4">
          <Row>
            <Col md="3">
              <div class="text-center">
                <img
                  src="https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg"
                  class="avatar rounded-circle img-thumbnail"
                  alt="avatar"
                />
                <h6>Upload a different photo...</h6>
                <input
                  type="file"
                  class="text-center center-block file-upload"
                />
              </div>
            </Col>

            <Col md="6">
              <form class="text-center border border-light p-5">
                <p class="h4 mb-4">Property</p>

                <Input
                  label="Name/Headline"
                  group
                  type="text"
                  validate
                  readOnly
                  value={this.state.headline}
                  required
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Unit, Suite, Building, etc."
                  readOnly
                  group
                  value={this.state.unit}
                  readOnly
                  type="text"
                  validate
                  id="unit"
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Street Address"
                  group
                  readOnly
                  value={this.state.strad}
                  type="text"
                  id="strad"
                  validate
                  error="wrong"
                  success="right"
                />

                <Input
                  label="City"
                  group
                  value={this.state.city}
                  type="text"
                  id="city"
                  validate
                  readOnly
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Country"
                  group
                  value={this.state.country}
                  type="text"
                  id="country"
                  validate
                  readOnly
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Zip Code"
                  group
                  value={this.state.zip}
                  type="number"
                  validate
                  readOnly
                  id="zip"
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Property Description"
                  group
                  type="textarea"
                  rows="3"
                  validate
                  required
                  value={this.state.propdesc}
                  readOnly
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Property Type"
                  group
                  value={this.state.proptype}
                  id="proptype"
                  type="text"
                  validate
                  readOnly
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Bedrooms"
                  group
                  value={this.state.bedroom}
                  id="bedroom"
                  type="number"
                  validate
                  readOnly
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Accommodates"
                  group
                  type="number"
                  value={this.state.accomodate}
                  id="accomodate"
                  readOnly
                  validate
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Bathrooms"
                  step="0.5"
                  group
                  readOnly
                  value={this.state.bathroom}
                  id="bathroom"
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                />

                <div class="form-row mb-4 grey-text">
                  <div class="col">
                    <Input
                      label="Availablity Start Date"
                      group
                      readOnly
                      type="text"
                      value={this.state.startDate}
                      validate
                      error="wrong"
                      success="right"
                    />
                  </div>
                  <div class="col">
                    <Input
                      label="Availablity End Date"
                      group
                      value={this.state.endDate}
                      readOnly
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
                  </div>
                </div>

                <Input
                  label="Currency"
                  readOnly
                  group
                  value={this.state.currency}
                  id="currency"
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Base Rate"
                  readOnly
                  group
                  value={this.state.baserate}
                  id="baserate"
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Minimum stay (nights)"
                  group
                  type="number"
                  validate
                  readOnly
                  value={this.state.minstay}
                  id="minstay"
                  error="wrong"
                  success="right"
                  min="1"
                  step="1"
                />

                <button
                  class="btn btn-info my-4 btn-block"
                  type="button"
                  onClick={this.chanFlag}
                >
                  Update
                </button>
              </form>
            </Col>
          </Row>
        </div>
      );
    } else if (this.state.flag == 1) {
      return (
        <div className="container pt-4">
          <Row>
            <Col md="3">
              <div class="text-center">
                <img
                  src="https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg"
                  class="avatar rounded-circle img-thumbnail"
                  alt="avatar"
                />
                <h6>Upload a different photo...</h6>
                <input
                  type="file"
                  class="text-center center-block file-upload"
                />
              </div>
            </Col>

            <Col md="6">
              <form class="text-center border border-light p-5">
                <p class="h4 mb-4">Profile</p>

                <Input
                  label="Name/Headline"
                  group
                  id="headline"
                  type="text"
                  validate
                  value={this.state.headline}
                  onChange={this.handleProp}
                  required
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Unit, Suite, Building, etc."
                  group
                  value={this.state.unit}
                  onChange={this.handleProp}
                  type="text"
                  validate
                  id="unit"
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Street Address"
                  group
                  onChange={this.handleProp}
                  type="text"
                  value={this.state.strad}
                  id="strad"
                  validate
                  error="wrong"
                  success="right"
                />

                <Input
                  label="City"
                  group
                  onChange={this.handleProp}
                  value={this.state.city}
                  type="text"
                  id="city"
                  validate
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Country"
                  group
                  onChange={this.handleProp}
                  value={this.state.country}
                  type="text"
                  id="country"
                  validate
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Zip Code"
                  group
                  onChange={this.handleProp}
                  value={this.state.zip}
                  type="number"
                  validate
                  id="zip"
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Property Description"
                  group
                  type="textarea"
                  rows="3"
                  validate
                  required
                  id="propdesc"
                  onChange={this.handleProp}
                  value={this.state.propdesc}
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Property Type"
                  group
                  onChange={this.handleProp}
                  value={this.state.proptype}
                  id="proptype"
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Bedrooms"
                  group
                  onChange={this.handleProp}
                  value={this.state.bedroom}
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
                  value={this.state.accomodate}
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
                  value={this.state.bathroom}
                  id="bathroom"
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                />

                <div class="form-row mb-4 grey-text">
                  <div class="col">
                    <Input
                      label="Availablity Start Date"
                      group
                      readOnly
                      type="text"
                      value={this.state.startDate}
                      validate
                      error="wrong"
                      success="right"
                    />
                  </div>
                  <div class="col">
                    <Input
                      label="Availablity End Date"
                      group
                      value={this.state.endDate}
                      readOnly
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                    />
                  </div>
                </div>

                <Input
                  label="Currency"
                  group
                  onChange={this.handleProp}
                  id="currency"
                  type="number"
                  value={this.state.currency}
                  validate
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Base Rate"
                  group
                  onChange={this.handleProp}
                  value={this.state.baserate}
                  id="baserate"
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Minimum stay (nights)"
                  group
                  type="number"
                  validate
                  onChange={this.handleProp}
                  value={this.state.minstay}
                  id="minstay"
                  error="wrong"
                  success="right"
                  min="1"
                  step="1"
                />

                <button
                  class="btn btn-info my-4 btn-block"
                  type="button"
                  onClick={this.chanFlag}
                >
                  Submit
                </button>
              </form>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default propertyInfo;
