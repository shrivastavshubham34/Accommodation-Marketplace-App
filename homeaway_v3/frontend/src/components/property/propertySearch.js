import React, { Component } from "react";
import { Card, CardBody } from "mdbreact";
import axios from "axios";
import "./search.css";
import { Redirect } from "react-router";
import Header from "../Header";
import SearchPropertyRes from "./searchPropertyRes";

class propertySearch extends Component {
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
    const { handle } = this.props.match.params;
    console.log(handle);
    this.setState({
      city: handle
    });
  }

  render() {
    const { handle } = this.props.match.params;

    let redirectVar = null;
    /*   if (!sessionStorage.getItem("email")) {
      redirectVar = <Redirect to="/home" />;
    }
 */
    return (
      <div>
        {redirectVar}
        <Header />
        <div class="container-fluid" style={{ "background-color": "#e8e8e8" }}>
          <div class="container container-pad" id="property-listings">
            <div class="row">
              <div class="col-md-12">
                <h1>Properties as per your criteria</h1>
                <p>Find a top-rated home with ameneties you need</p>
              </div>
            </div>
            <SearchPropertyRes city={handle} />
          </div>
        </div>
      </div>
    );
  }
}

/* export default compose(graphql(myPropertyQuery, { name: "myPropertyQuery" }))(
  propertyList
); */
export default propertySearch;
