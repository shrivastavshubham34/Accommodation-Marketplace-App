import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
