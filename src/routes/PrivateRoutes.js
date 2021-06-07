import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthUtil } from "../utils/AuthUtil";

class PrivateRoute extends Component {
  guardFunction = (roles, userRole) => {
    return !!roles.find((role) => role === userRole);
  };

  render() {
    const { component: Component, auth, roles, ...rest } = this.props;
    const { isAuthenticated, loading } = auth;
    let roleMatch = true;
    if (roles) {
      roleMatch = this.guardFunction(roles, AuthUtil.getRole(auth));
    }

    return (
      <Route
        {...rest}
        render={(props) => {
          return !isAuthenticated && loading ? (
            <Redirect to="/user/login" />
          ) : roleMatch ? (
            <Component {...props} />
          ) : (
            <Redirect to="/trips" />
          );
        }}
      />
    );
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
