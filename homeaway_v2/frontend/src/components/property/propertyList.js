import React, { Component } from "react";
import { Card, CardBody } from "mdbreact";

import Header from "../Header";

import axios from "axios";

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

  componentDidMount() {
    var url =
      "http://18.217.191.163:3001/propertylist/:" + sessionStorage.getItem("email");
	  
	      axios.defaults.withCredentials = true;

    axios.defaults.headers.common = {
      Authorization: "JWT " + sessionStorage.getItem("token")
    };

    axios.get(url).then(response => {
      //update the state with the response data

      console.log(response.data.results);
      this.setState({
        propertyL: response.data.results
      });
    });
  }

  render() {
    //iterate over student to create a table row

    let details = this.state.propertyL.map(property => {
      console.log(property);
      var link = "/owner/property/:" + property._id;
      return (
        <ul class="list-unstyled">
          <li class="media">
            <img
              class="d-flex mr-3"
              src="https://mdbootstrap.com/img/Photos/Others/placeholder7.jpg"
              alt="logo"
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
    if (!sessionStorage.getItem("email")) {
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
