import React, { Component } from "react";

import { compose, graphql } from "react-apollo";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { viewProfileData, updateUserMutation } from "../../queries/queries";
import jwtDecode from "jwt-decode";
class ProfileTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      gender: ""
    };
    this.onChange = this.onChange.bind(this);

    this.notificationDOMRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState({
        firstName: (newProps.data.profile || "").firstName,
        lastName: (newProps.data.profile || "").lastName,
        email: (newProps.data.profile || "").email,
        gender: (newProps.data.profile || "").gender
      });
      console.log(newProps);
      console.log("newprops");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var decoded = jwtDecode(sessionStorage.getItem("token"));

    console.log("inside submit");
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.gender === "" ||
      this.state.email === ""
    ) {
      console.log("must enter value");
      this.notificationDOMRef.current.addNotification({
        title: "Fields cannot be empty",
        message: "Please enter all values",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
      });
    } else {
      this.props.updateUserMutation({
        variables: {
          id: decoded.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          gender: this.state.gender
        }
      });
    }
  }

  render() {
    // console.log(this.state);
    var props1 = this.props.data;

    // console.log(this.state);
    if (props1.loading) {
      return <div>Loading Properties...</div>;
    } else {
      //  console.log(props1.profile);

      //  console.log(this.state);
      console.log(this.state);
      return (
        <div>
          <ReactNotification ref={this.notificationDOMRef} />

          <form
            class="text-center border border-light "
            onSubmit={this.handleSubmit}
          >
            <p class="h4 mb-4">Profile</p>

            <div class="form-row mb-4 grey-text">
              <div class="col">
                <input
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </div>
              <div class="col">
                <input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <input
              label="E-mail"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
            />

            <div>
              <label>Sex</label>
              <br />
              <div class="form-check form-check-inline radio">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  value="male"
                  checked={"male" === this.state.gender}
                  onChange={this.onChange}
                />
                <label class="form-check-label" for="gender">
                  Male
                </label>
              </div>
              <div class="form-check form-check-inline radio">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  value="female"
                  checked={"female" === this.state.gender}
                  onChange={this.onChange}
                />
                <label class="form-check-label" for="gender">
                  Female
                </label>
              </div>
              <div class="form-check form-check-inline radio">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender1"
                  value="other"
                  checked={"other" === this.state.gender}
                  onChange={this.onChange}
                />
                <label class="form-check-label" for="gender1">
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
        </div>
      );
    }
  }
}

/* export default graphql(viewProfileData, {
  options: props => {
    return {
      variables: {
        id: props.id
      }
    };
  }
})(ProfileTab); */
export default compose(
  graphql(viewProfileData, {
    options: props => {
      return {
        variables: {
          id: props.id
        }
      };
    }
  }),
  graphql(updateUserMutation, { name: "updateUserMutation" })
)(ProfileTab);
