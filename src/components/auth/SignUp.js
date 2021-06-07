import React, { Component } from "react";
import { ERole } from "../../constant/Roles";
import { connect } from "react-redux";
import { register } from "../../store/actions/Auth";
import loginRedirect from "../unProtectedRoute";
import { Link } from "react-router-dom";
import { GenUtil } from "../../utils/GenUtil";
import { setAlertAction } from "../../store/actions/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: ERole.REGULAR,
      password: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("--------------------------");
    let notValid = GenUtil.validateUserBeforeSubmit(this.state);
    if (notValid) {
      this.props.setAlertAction(notValid, "error");
      return;
    }
    this.props.register(this.state);
  };

  onChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    let { email, name, role, password } = this.state;

    return (
      <div className={"screen_height center_vertical"}>
        <form onSubmit={this.onSubmit} className={"form"}>
          <div>
            <TextField
              onChange={(e) => this.onChange(e)}
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              required
            />
          </div>
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
            <Select name="role" value={role} onChange={(e) => this.onChange(e)}>
              <MenuItem value={ERole.REGULAR}>Regular</MenuItem>
              <MenuItem value={ERole.MANAGER}>Manager</MenuItem>
            </Select>
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
              variant={"outlined"}
              color={"primary"}
              onClick={this.onSubmit}
            >
              SignUp
            </Button>
          </div>
        </form>
        <Link to="/user/login">Already Registered? LOGIN</Link>
      </div>
    );
  }
}

export default connect(null, { register, setAlertAction })(
  loginRedirect(SignUp)
);
