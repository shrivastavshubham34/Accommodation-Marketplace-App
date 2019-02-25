import React, { Component } from "react";
import { Card, CardBody } from "mdbreact";
import axios from "axios";
import "./search.css";
import { Redirect, withRouter } from "react-router";

import { bookPropertyMutation } from "../../queries/queries";
import { compose, graphql } from "react-apollo";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Header from "../Header";
import SearchPropertyRes from "./searchPropertyRes";
import jwtDecode from "jwt-decode";

import { DateRangePicker } from "react-dates";
class finalBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "",
      endDate: "",
      propid: ""
    };
    this.notificationDOMRef = React.createRef();
    this.bookProperty = this.bookProperty.bind(this);
  }

  componentDidMount() {
    const { propid } = this.props.match.params;
    console.log(propid);
    this.setState({
      propid: propid
    });
  }

  bookProperty(e) {
    var decoded = jwtDecode(sessionStorage.getItem("token"));

    if (this.state.startDate === "" || this.state.endDate === "") {
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
      const data = {
        propid: this.state.propid,
        startDate: this.state.startDate.format("YYYY-MM-DD"),
        endDate: this.state.endDate.format("YYYY-MM-DD"),
        bookerId: decoded.id
      };
      console.log(data);
      this.props.bookPropertyMutation({
        variables: {
          id: data.propid,
          startDate: data.startDate,
          endDate: data.endDate,
          bookerId: data.bookerId
        }
      });
      this.props.history.push("/home");
    }
  }

  render() {
    let redirectVar = null;
    /*   if (!sessionStorage.getItem("email")) {
      redirectVar = <Redirect to="/home" />;
    } */

    return (
      <div>
        <ReactNotification ref={this.notificationDOMRef} />

        {redirectVar}
        <Header />
        <div class="container-fluid" style={{ "background-color": "#e8e8e8" }}>
          <div class="container container-pad" id="property-listings">
            <div class="row">
              <div class="col-md-12">
                <h1>Final Step</h1>
                <p>Enter Duration for your trip</p>
              </div>
            </div>
            <div class="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing text-center">
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="propertystart" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="propertyend" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({ startDate, endDate })
                } // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
              <button id="BUTTON_1" onClick={this.bookProperty}>
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* export default compose(graphql(myPropertyQuery, { name: "myPropertyQuery" }))(
  propertyList
); */

export default compose(
  withRouter,
  graphql(bookPropertyMutation, { name: "bookPropertyMutation" })
)(finalBook);
