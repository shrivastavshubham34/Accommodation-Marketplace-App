import React, { Component } from "react";

import { compose, graphql } from "react-apollo";
import { withRouter } from "react-router";
import { DateRangePicker } from "react-dates";
import { searchPropertyQuery } from "../../queries/queries";

class SearchPropertyRes extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      book: "Book"
    };
  }

  nextStep(id, e) {
    console.log(id);
    this.props.history.push("/finalBooking/" + id);
  }
  myProperty() {
    var data = this.props.data;
    var counter = "Book";
    if (data.loading) {
      return <div>Loading Properties...</div>;
    } else {
      return data.searchproperties.map(property => {
        if (property.bookedBy.firstName != null) counter = "Booked";
        else counter = "Book";
        return (
          <div
            key={property.id}
            class="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing"
          >
            <div class="media">
              <a class="pull-left" href="#" target="_parent" />

              <div class="clearfix visible-sm" />

              <div class="media-body fnt-smaller">
                <a href="#" target="_parent" />

                <h4 class="media-heading">
                  <a href="#" target="_parent">
                    {property.title}{" "}
                    <small class="pull-right">
                      {property.city}
                      {","}
                      {property.zip}
                    </small>
                  </a>
                </h4>

                <ul class="list-inline mrg-0 btm-mrg-10 clr-535353">
                  <button
                    id="BUTTON_1"
                    class="pull-right"
                    onClick={this.nextStep.bind(this, property.id)}
                    value={property.id}
                  >
                    {counter}
                  </button>
                  <li>Owned By:</li>

                  <li style={{ "list-style": "none" }}>|</li>
                  <div class="pull-right">
                    {<span>booked by {property.bookedBy.firstName}</span>}
                  </div>
                  <li>{property.owner.firstName}</li>

                  <li style={{ "list-style": "none" }}>|</li>

                  <li> </li>
                </ul>

                <p class="hidden-xs">{property.description}</p>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    console.log("inside dettails");
    console.log(this.props);

    return <div>{this.myProperty()}</div>;
  }
}

/* export default compose(
  withRouter,
  graphql(searchPropertyQuery, {
    options: props => {
      return {
        variables: {
          city: props.city
        }
      };
    }
  })(SearchPropertyRes) 
);*/
export default compose(
  withRouter,
  graphql(searchPropertyQuery, {
    options: props => {
      return {
        variables: {
          city: props.city
        }
      };
    }
  })
)(SearchPropertyRes);
