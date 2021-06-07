import React, { Component } from "react";
import { ERole } from "../../constant/Roles";
import { connect } from "react-redux";
import { AuthUtil } from "../../utils/AuthUtil";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class UserForm extends Component {
  render() {
    const isAdmin = AuthUtil.isAdmin(this.props.auth);
    const { email, password, role, name } = this.props.data;
    const { onChange, onSubmit } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className={"form"}>
          <div>
            <TextField
              onChange={(e) => onChange(e)}
              type="email"
              name="email"
              placeholder="email"
              value={email}
              required
            />
          </div>
          <label htmlFor={"password"}>password</label>
          <div>
            <TextField
              id={"password"}
              onChange={(e) => onChange(e)}
              type="password"
              name="password"
              placeholder="password"
              value={password}
              required
            />
          </div>
          <div>
            <Select name="role" value={role} onChange={(e) => onChange(e)}>
              <MenuItem value={ERole.REGULAR}>Regular</MenuItem>
              <MenuItem value={ERole.MANAGER}>Manager</MenuItem>
              {isAdmin ? <MenuItem value={ERole.ADMIN}>Admin</MenuItem> : null}
            </Select>
          </div>
          <div>
            <TextField
              onChange={(e) => onChange(e)}
              type="text"
              name="name"
              placeholder="name"
              value={name}
              required
            />
          </div>
          <div>
            <Button variant={"outlined"} onClick={onSubmit}>
              {this.props.type === "Edit" ? "Edit User" : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(UserForm);
