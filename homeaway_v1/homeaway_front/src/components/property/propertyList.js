import React, { Component } from "react";
import { Card, CardBody } from "mdbreact";

import Header from "../Header";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class propertyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyL: [],
      del: "",
      mainredirectVar: false
    };
  }

  componentWillMount() {
    var url = "http://localhost:3001/propertylist/:" + cookie.load("owner");
    axios.get(url).then(response => {
      //update the state with the response data
      console.log(response.data);
      this.setState({
        propertyL: response.data
      });
    });
  }

  render() {
    //iterate over student to create a table row

    let details = this.state.propertyL.map(property => {
      console.log(property);
      var link = "/owner/property/:" + property.property_id;
      return (
        <ul class="list-unstyled">
          <li class="media">
            <img
              class="d-flex mr-3"
              src="https://mdbootstrap.com/img/Photos/Others/placeholder7.jpg"
              alt="Generic placeholder image"
            />
            <div class="media-body">
              <a href={link}>
                <h5 class="mt-0 mb-1 font-weight-bold">{property.headline}</h5>
              </a>
              {property.propdesc}
            </div>
          </li>
        </ul>
      );
    });

    let redirectVar = null;
    if (!cookie.load("owner")) {
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <div>
        {redirectVar}

        <Header />
        <Card>
          <CardBody>{details}</CardBody>
        </Card>
      </div>
    );
  }
}

export default propertyList;
