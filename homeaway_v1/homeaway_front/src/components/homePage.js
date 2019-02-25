import React, { Component } from "react";
import "../App.css";
import IndexHeader from "./Homepage/IndexHeader";

class homePage extends Component {
  state = {};
  render() {
    return (
      <div className="backgroundimg">
        <IndexHeader />
      </div>
    );
  }
}

export default homePage;
