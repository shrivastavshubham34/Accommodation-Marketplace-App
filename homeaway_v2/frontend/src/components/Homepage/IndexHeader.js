import React, { Component } from "react";
import SearchBar from "./SearchBar";
import "../../App.css";
import { connect } from "react-redux";

import { DateRangePicker } from "react-dates";

import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  Input
} from "mdbreact";

class IndexHeader extends Component {
  constructor() {
    super();

    this.state = {
      cityLoc: "",
      stateLoc: "",
      reloaded: true
    };
  }

  // Get the info from the LocationSearchInput component and save
  // it to state here in ReportForm.
  setFormLocation = googleLocation => {
    // The Google result comes back as a comma-separated string:
    // "Austin, TX, USA". Parse it into usable data.
    let parsedLoc = googleLocation.split(", ");
    this.setState({
      cityLoc: parsedLoc[0],
      stateLoc: parsedLoc[1],
      reloaded: false
    });
    console.log("Location" + this.state.cityLoc);
  };

  handleLogout = () => {
    sessionStorage.clear();
  };

  render() {
    let temp = null;

    if (
      this.props.usertype === "owner" ||
      sessionStorage.getItem("usertype") === "owner"
    ) {
      temp = (
        <Dropdown>
          <DropdownToggle nav caret>
            {sessionStorage.getItem("email")}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/profile">Profile</DropdownItem>
            <DropdownItem href="/owner/addProperty">Add property</DropdownItem>

            <DropdownItem href="/owner/viewProperty">
              View your properties
            </DropdownItem>

            <DropdownItem href="/" onClick={this.handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    } else if (
      this.props.usertype === "traveler" ||
      sessionStorage.getItem("usertype") === "traveler"
    ) {
      temp = (
        <Dropdown>
          <DropdownToggle nav caret>
            {sessionStorage.getItem("email")}
          </DropdownToggle>
          <DropdownMenu>
            profile
            <DropdownItem href="/profile">Profile</DropdownItem>
            <DropdownItem href="/login/owner">Owner Login</DropdownItem>
            <DropdownItem href="/" onClick={this.handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    } else {
      temp = (
        <Dropdown>
          <DropdownToggle nav caret>
            Login
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/login/owner">Owner Login</DropdownItem>
            <DropdownItem href="/login/traveler">Traveler Login</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <div>
        <Navbar color="transparent" expand="md" dark>
          <NavbarBrand href="#">
            <img
              src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"
              height="30"
              alt="HomeAway.com"
              className="d-inline-block align-top"
              title="HomeAway.com"
            />
          </NavbarBrand>
          <NavbarNav right>
            <NavItem>{temp}</NavItem>
            <NavbarBrand>
              <img
                src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"
                height="40"
                alt="logo"
                className="d-inline-block align-top"
              />
            </NavbarBrand>
            <NavItem />
          </NavbarNav>
        </Navbar>
        <div>
          <div class="jumbotron jumbotron-fluid bg-transparent">
            <div class="container text-white">
              <h1 class="card-title h2-responsive mt-2 font-bold">
                <strong>
                  <span className="HeadLine_text">
                    Book beach houses, cabins,
                  </span>
                  <br />
                  <span className="HeadLine_text">
                    condos and more, worldwide
                  </span>
                </strong>
              </h1>

              <p class="lead">
                This is a demo version of HomeAway webapp created for hands-on
                experience.
              </p>

              <div className="row">
                <form className="form-inline flex">
                  <SearchBar setFormLocation={this.setFormLocation} />
                  <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) =>
                      this.setState({ startDate, endDate })
                    } // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput =>
                      this.setState({ focusedInput })
                    } // PropTypes.func.isRequired,
                  />
                  <Input
                    type="number"
                    id="guest"
                    min="1"
                    className="form-control bg-white"
                    label="Guests"
                    onChange={this.handleChange}
                  />
                  <button
                    type="submit"
                    className="btn btn btn-primary"
                    onClick={this.handleClick}
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="container-fluid">
                <ul class=" mr-auto ValueProps__list">
                  <li class="ValueProps__item">
                    <strong class="ValueProps__title">
                      Your whole vacation starts here
                    </strong>
                    <span class="ValueProps__blurb">
                      Choose a rental from the world's best selection
                    </span>
                  </li>
                  <li class="ValueProps__item">
                    <strong class="ValueProps__title">
                      Book and stay with confidence
                    </strong>
                    <span class="ValueProps__blurb">
                      <a href="https://www.homeaway.com/info/ha-guarantee/travel-with-confidence?icid=il_o_link_bwc_homepage">
                        Secure payments, peace of mind
                      </a>
                    </span>
                  </li>
                  <li class="ValueProps__item">
                    <strong class="ValueProps__title">
                      Your vacation your way
                    </strong>
                    <span class="ValueProps__blurb">
                      More space, more privacy, no compromises
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authFlag: state.login.authFlag,
    usertype: state.login.usertype
  };
};

export default connect(mapStateToProps)(IndexHeader);
