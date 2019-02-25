import React, { Component } from "react";
import "./search.css";
import Header from "../Header";

class bookProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {" "}
        <Header />
        <div class="container-fluid" style={{ "background-color": "#e8e8e8" }}>
          <div class="container container-pad" id="property-listings" />
        </div>
      </div>
    );
  }
}

export default bookProperty;
