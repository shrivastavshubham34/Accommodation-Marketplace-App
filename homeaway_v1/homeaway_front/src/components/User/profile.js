import React, { Component } from "react";
import { Row, Col, Card, CardBody, Input, Button } from "mdbreact";

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio3: false,
      flag: 1
    };
  }
  render() {
    if (this.state.flag == 0) {
      console.log("0");
      return (
        <div className="container pt-4">
          <Row>
            <Col md="6">
              <form class="text-center border border-light p-5">
                <p class="h4 mb-4">Owner Profile</p>

                <div class="form-row mb-4 grey-text">
                  <div class="col">
                    <Input
                      label="First name"
                      group
                      type="text"
                      validate
                      required
                      error="wrong"
                      success="right"
                    />
                  </div>
                  <div class="col">
                    <Input
                      label="Last Name"
                      group
                      type="text"
                      validate
                      required
                      error="wrong"
                      success="right"
                    />
                  </div>
                </div>

                <Input
                  label="E-mail"
                  group
                  type="email"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Phone Number"
                  group
                  type="number"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="About Me"
                  group
                  type="textarea"
                  rows="3"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="City"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Country"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Company"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="School"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Hometown"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Languages"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="Male"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Male
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="Male"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Female
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="Female"
                  />
                  <label class="form-check-label" for="exampleRadios2">
                    Other
                  </label>
                </div>
                <button class="btn btn-info my-4 btn-block" type="submit">
                  Sign in
                </button>
              </form>
            </Col>
          </Row>
        </div>
      );
    } else {
      console.log("1");
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

                <div class="form-row mb-4 grey-text">
                  <div class="col">
                    <Input
                      label="First name"
                      group
                      type="text"
                      validate
                      required
                      error="wrong"
                      success="right"
                    />
                  </div>
                  <div class="col">
                    <Input
                      label="Last Name"
                      group
                      type="text"
                      validate
                      required
                      error="wrong"
                      success="right"
                    />
                  </div>
                </div>

                <Input
                  label="E-mail"
                  group
                  type="email"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Phone Number"
                  group
                  type="number"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="About Me"
                  group
                  type="textarea"
                  rows="3"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="City"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Country"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Company"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="School"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <Input
                  label="Hometown"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />

                <Input
                  label="Languages"
                  group
                  type="text"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="Male"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    Male
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="Female"
                  />
                  <label class="form-check-label" for="exampleRadios2">
                    Female
                  </label>
                </div>
                <button class="btn btn-info my-4 btn-block" type="submit">
                  Sign in
                </button>
              </form>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default profile;
