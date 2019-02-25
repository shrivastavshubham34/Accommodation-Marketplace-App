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
import Navbar from "./Navbar";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        {/*Render 
      Different Component based on Route*/}
        <Route path="/" component={Navbar} exact />
        <Route path="/home" component={Homepage} />
        <Route path="/login/traveler" component={travelerLogin} />
        <Route path="/login/owner" component={ownerLogin} />
        <Route path="/signUp/traveler" component={travelerSignUp} />
        <Route path="/signUp/owner" component={ownerSignUp} />
        <Route path="/owner/viewProperty" component={propertyList} />

        <Route path="/owner/property/:propId" component={propertyInfo} />

        <Route path="/owner/profile" component={profile} />

        <Route path="/owner/addProperty" component={addProperty} />
        {/* 
          signup
        view profile(edit button hint readonly feature of input buttons)
        owner property archive with edit button
        traveller search page
        owner property archive with book button  
        */}
      </div>
    );
  }
}

export default Main;
