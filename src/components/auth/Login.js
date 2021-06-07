import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/actions/Auth";
import PropTypes from "prop-types";
import loginRedirect from "../unProtectedRoute";
import { Link } from "react-router-dom";
import { setAlertAction } from "../../store/actions/Alert";
import { GenUtil } from "../../utils/GenUtil";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    let notValid = GenUtil.validateUserBeforeSubmit(this.state);
    if (notValid) {
      this.props.setAlertAction(notValid, "error");
      return;
    }
    this.props.login(this.state);
  };

  onChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    let { email, password } = this.state;

    return (
      <div className={"center_vertical screen_height"}>
        <form onSubmit={this.onSubmit} className={"form"}>
          <div>
            <TextField
              onChange={(e) => this.onChange(e)}
              type="email"
              placeholder="Email Address"
              value={email}
              name="email"
              required
            />
          </div>
          <div>
            <TextField
              onChange={(e) => this.onChange(e)}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="form-control"
              required
            />
          </div>
          <div>
            <Button
              color="primary"
              variant={"outlined"}
              onClick={this.onSubmit}
            >
              Login
            </Button>
          </div>
        </form>
        <Link to="/user/signup">Not registered? SIGN UP</Link>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login, setAlertAction })(loginRedirect(Login));
