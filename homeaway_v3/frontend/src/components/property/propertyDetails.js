import React, { Component } from "react";

import { compose, graphql } from "react-apollo";

import { myPropertyQuery } from "../../queries/queries";

class PropertyDetails extends Component {
  myProperty() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading Properties...</div>;
    } else {
      return data.myproperties.map(property => {
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
                  <li>Owned By:</li>

                  <li style={{ "list-style": "none" }}>|</li>

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

export default graphql(myPropertyQuery, {
  options: props => {
    return {
      variables: {
        ownerid: props.ownerid
      }
    };
  }
})(PropertyDetails);
