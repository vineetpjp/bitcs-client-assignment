import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/Auth";
import { ERole } from "../../constant/Roles";
import { AuthUtil } from "../../utils/AuthUtil";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
  onLogoutClick = () => {
    this.props.logout();
  };

  render() {
    const { auth } = this.props;
    let role = AuthUtil.getRole(auth);
    if (!auth?.isAuthenticated) {
      return null;
    }

    return (
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            listStyle: "none",
          }}
        >
          <li>
            <NavLink to="/trips" activeClassName="active_nav">
              <Button color="primary">TRIPS</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/trip/create" activeClassName="active_nav">
              <Button color="primary">CREATE TRIP</Button>
            </NavLink>
          </li>
          {role && (role === ERole.MANAGER || role === ERole.ADMIN) ? (
            <>
              <li>
                <NavLink to="/users" activeClassName="active_nav">
                  <Button color="primary">USERS</Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/user/create" activeClassName="active_nav">
                  <Button color="primary">CREATE USER</Button>
                </NavLink>
              </li>
            </>
          ) : null}
          <Button color="primary" onClick={this.onLogoutClick}>
            LOGOUT
          </Button>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { logout })(Navbar);
