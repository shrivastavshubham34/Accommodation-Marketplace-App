import React, { Component } from "react";
import { Card, CardBody } from "mdbreact";
import axios from "axios";

import { Redirect } from "react-router";
import Header from "../Header";
import { compose, graphql } from "react-apollo";
import PropertyDetails from "./propertyDetails";
import jwtDecode from "jwt-decode";

class propertyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownerid: "",
      propertyL: [],
      del: "",
      mainredirectVar: false
    };
  }

  componentDidMount() {
    /*    this.props.myPropertyQuery({
      variables: {
        ownerid: "5c08ddd96d08c5085caeb0b3"
      }
    }); */
  }

  render() {
    //iterate over student to create a table row

    let redirectVar = null;
    if (!sessionStorage.getItem("email")) {
      redirectVar = <Redirect to="/home" />;
    }

    var decoded = jwtDecode(sessionStorage.getItem("token"));

    return (
      <div>
        {redirectVar}

        <Header />
        <div class="container-fluid" style={{ "background-color": "#e8e8e8" }}>
          <div class="container container-pad" id="property-listings">
            <div class="row">
              <div class="col-md-12">
                <h1>My properties</h1>
                <p>Seeing all of them</p>
              </div>
            </div>
            <PropertyDetails ownerid={decoded.id} />
          </div>
        </div>
      </div>
    );
  }
}

/* export default compose(graphql(myPropertyQuery, { name: "myPropertyQuery" }))(
  propertyList
); */
export default propertyList;
