import React, { Component } from "react";
import "../App.css";

import { Navbar, NavbarBrand, NavbarNav, NavItem } from "mdbreact";

class Header extends Component {
  state = {};
  render() {
    return (
      <Navbar color="transparent" expand="md" dark>
        <NavbarBrand href="#">
          <a href="/home">
            <img
              src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"
              height="90%"
              className="d-inline-block align-top"
              title="HomeAway"
              alt="Homeaway"
            />
          </a>
        </NavbarBrand>
        <NavbarNav right>
          <NavItem>
            <img
              src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"
              height="90%"
              className="d-inline-block align-top"
              alt="Homeaway logo"
            />
          </NavItem>
        </NavbarNav>
      </Navbar>
    );
  }
}

export default Header;
