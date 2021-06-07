import React, { Component } from "react";
import history from "../../history";
import { ERole } from "../../constant/Roles";
import UserForm from "./UserForm";
import { UserUtil } from "../../utils/UserUtil";

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: ERole.REGULAR,
      name: "",
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const data = await UserUtil.createUser(this.state);
    if (Object.keys(data).length) {
      //set Alert
    } else {
      //setAlert
    }
    history.push("/users");
  };

  onChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  render() {
    return (
      <div>
        <UserForm
          data={this.state}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          type={"create"}
        />
      </div>
    );
  }
}

UserCreate.propTypes = {};

export default UserCreate;
