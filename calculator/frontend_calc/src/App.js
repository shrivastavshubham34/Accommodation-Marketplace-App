import React, { Component } from "react";
import "./App.css";
import update from "react-addons-update";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = { inputSet: [], result: "", switchDub: "0" };

    this.addToInputArray = this.addToInputArray.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.addValue = this.addValue.bind(this);
  }

  // Function to take both inputs and send them to backend

  addValue = e => {
    this.setState({
      result: e.target.value,
      switchDub: true
    });
  };

  calculateResult = e => {
    const newinputSet = update(this.state.inputSet, {
      $push: [this.state.result]
    });

    this.setState({
      inputSet: newinputSet
    });
    var output1 = newinputSet.join("");
    const data = { input: output1 };

    axios.get("http://localhost:3001/calc", { params: data }).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          result: response.data,
          inputSet: []
        });
      }
    });
  };
  addToInputArray = e => {
    const value = e.target.getAttribute("value");
    console.log(this.state.result);
    console.log(value);
    switch (value) {
      case "C":
        this.setState({
          inputSet: [],
          result: "",
          switchDub: "0"
        });
        break;
      case "=": {
        this.calculateResult();
        break;
      }
      default: {
        if (this.state.switchDub === true) {
          const newinputSet = update(this.state.inputSet, {
            $push: [this.state.result]
          });

          const newinputSet1 = update(newinputSet, {
            $push: [value]
          });

          this.setState({
            result: "",
            inputSet: newinputSet1,
            switchDub: false
          });
        }

        break;
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="box">
          <form>
            <div className="display">
              <input
                type="number"
                size="18"
                id="d"
                onChange={this.addValue}
                value={this.state.result}
                placeholder="0"
                autoFocus
              />
            </div>
            <div className="keys">
              <p>
                <input
                  type="reset"
                  className="button gray"
                  value="/"
                  onClick={this.addToInputArray}
                />
                <input
                  type="reset"
                  className="button gray"
                  value="*"
                  onClick={this.addToInputArray}
                />
                <input
                  type="reset"
                  className="button gray"
                  value="+"
                  onClick={this.addToInputArray}
                />
                <input
                  className="button gray"
                  value="-"
                  type="reset"
                  onClick={this.addToInputArray}
                />
              </p>
              <input
                type="reset"
                className="button pink"
                value="="
                onClick={this.addToInputArray}
              />
              <input
                type="reset"
                className="button pink"
                value="C"
                onClick={this.addToInputArray}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
