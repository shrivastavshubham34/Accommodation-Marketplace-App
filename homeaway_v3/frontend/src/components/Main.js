import React, { Component } from "react";
import Homepage from "./homePage";
import { Route } from "react-router-dom";
import travelerLogin from "./Login/travelerLogin";
import ownerLogin from "./Login/ownerLogin";
import addProperty from "./owner/addProperty";
import propertyList from "./property/propertyList";
import profile from "./User/profile";
import propertyInfo from "./property/propertyInfo";
import ownerSignUp from "./User/ownerSignUp";
import travelerSignUp from "./User/travelerSignUp";
import propertySearch from "./property/propertySearch";
import finalBook from "./property/finalBook";
import bookings from "./owner/bookings";
//GraphQl

import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import Navbar from "./Navbar";

// apollo client setup

/* export const client = new ApolloClient({
   uri: "http://localhost:3001/graphql"
}); */

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class Main extends Component {
  state = {};
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          {/*Render 
      Different Component based on Route*/}
          <Route path="/" component={Navbar} exact />
          <Route path="/home" component={Homepage} />
          <Route path="/propertySearch/:handle" component={propertySearch} />

          <Route path="/login/traveler" component={travelerLogin} />
          <Route path="/login/owner" component={ownerLogin} />
          <Route path="/signUp/traveler" component={travelerSignUp} />
          <Route path="/signUp/owner" component={ownerSignUp} />
          <Route path="/finalBooking/:propid" component={finalBook} />

          <Route path="/myBookings" component={bookings} />

          <Route path="/owner/viewProperty" component={propertyList} />

          <Route path="/owner/property/:propId" component={propertyInfo} />

          <Route path="/profile" component={profile} />

          <Route path="/owner/addProperty" component={addProperty} />
        </div>
      </ApolloProvider>
    );
  }
}

export default Main;
