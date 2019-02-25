import React, { Component } from "react";
import SearchBar from "./SearchBar";
import "../../App.css";
import cookie from "react-cookies";

import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";

import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  Dropdown,
  Fa,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
  Input
} from "mdbreact";

class IndexHeader extends Component {
  constructor() {
    super();
    this.state = {
      cityLoc: "",
      stateLoc: ""
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
      stateLoc: parsedLoc[1]
    });
    console.log("Location" + this.state.cityLoc);
  };

  handleLogout = () => {
    cookie.remove("owner", { path: "/" });
    cookie.remove("traveler", { path: "/" });
  };

  render() {
    let temp = null;
    if (cookie.load("owner")) {
      temp = (
        <Dropdown>
          <DropdownToggle nav caret>
            {cookie.load("owner")}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/owner/addProperty">Add property</DropdownItem>

            <DropdownItem href="/owner/viewProperty">
              List your property
            </DropdownItem>

            <DropdownItem href="/" onClick={this.handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    } else if (cookie.load("traveler")) {
      temp = (
        <Dropdown>
          <DropdownToggle nav caret>
            {cookie.load("traveler")}
          </DropdownToggle>
          <DropdownMenu>
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
                This is a modified jumbotron that occupies the entire horizontal
                space of its parent.
              </p>
              <form class="form-inline">
                <span className="col-xs-8">
                  <input
                    type="text"
                    id="city"
                    className="form-control"
                    placeholder="Where do you want to go?"
                    onChange={this.handleChange}
                  />
                </span>

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
                  type="text"
                  id="guest"
                  className="form-control bg-white"
                  placeholder="Guests"
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

export default IndexHeader;
