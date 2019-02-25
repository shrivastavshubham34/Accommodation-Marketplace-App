import React, { Component } from "react";
import "../../App.css";
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from "react-bootstrap";

class Logo extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar inverse className="logo_header">
          <Navbar.Header>
            <Navbar.Brand>
              <div class="site-header-logo">
                <a
                  class="site-header-logo__link flex-item"
                  href="https://www.homeaway.com/"
                  title="HomeAway.com"
                >
                  <img
                    alt="HomeAway logo"
                    class="site-header-logo__img img-responsive"
                    role="presentation"
                    src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"
                  />
                </a>
              </div>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={1} title="User" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1}>My trips</MenuItem>
              <MenuItem eventKey={1.2}>
                <a
                  data-bypass="true"
                  href="https://www.homeaway.com/traveler/profile/edit"
                >
                  My profile
                </a>
              </MenuItem>
              <MenuItem eventKey={1.3} />
              <MenuItem divider />
              <MenuItem eventKey={1.4}>
                <a
                  data-bypass="true"
                  href="https://www.homeaway.com/haod/auth/signout.html?service=https%3A%2F%2Fwww.homeaway.com%2F"
                >
                  Logout
                </a>
              </MenuItem>
            </NavDropdown>

            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Logo;
