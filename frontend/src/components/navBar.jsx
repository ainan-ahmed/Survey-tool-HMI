import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
class NavBar extends Component {
  state = {
    search: ''
  }
  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  render() {
    
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" className="ms-2 text-center text-info">
          Survey Tool
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {!isAuthenticated && (
            <Nav className="ms-auto">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </Nav>
          )}
          {isAuthenticated && user && (
            <React.Fragment className="">
              <Nav className="ms-auto">
                <NavLink className="nav-item nav-link" to="/">
                  Home
                </NavLink>
                <NavLink
                  className="nav-item nav-link"
                  to={"/auth/" + user.username}
                >
                  {user.username}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </Nav>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
