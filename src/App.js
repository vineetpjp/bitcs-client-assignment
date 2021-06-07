import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { loadUser } from "./store/actions/Auth";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import PrivateRoute from "./routes/PrivateRoutes";
import Trips from "./components/Trip/Trips";
import { ERole } from "./constant/Roles";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Users from "./components/User/Users";
import TripCreateAndEdit from "./components/Trip/TripCreateAndEdit";
import UserCreateAndEdit from "./components/User/UserCreateAndEdit";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Router history={history}>
        <PrivateRoute path="/" component={Navbar} />
        <Alert />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/signup" component={SignUp} />
          <PrivateRoute exact path="/trips" component={Trips} />
          <PrivateRoute
            exact
            path="/trip/create"
            component={TripCreateAndEdit}
          />
          <PrivateRoute
            exact
            path="/trip/edit/:id"
            component={TripCreateAndEdit}
          />
          <PrivateRoute
            exact
            path="/users"
            component={Users}
            roles={[ERole.MANAGER, ERole.ADMIN]}
          />
          <PrivateRoute
            exact
            path="/user/create"
            component={UserCreateAndEdit}
            roles={[ERole.MANAGER, ERole.ADMIN]}
          />
          <PrivateRoute
            exact
            path="/user/edit/:id"
            component={UserCreateAndEdit}
            roles={[ERole.MANAGER, ERole.ADMIN]}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { loadUser })(App);
