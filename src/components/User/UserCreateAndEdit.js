import React, { Component } from "react";
import history from "../../history";
import UserForm from "./UserForm";
import { ERole } from "../../constant/Roles";
import { UserUtil } from "../../utils/UserUtil";
import { GenUtil } from "../../utils/GenUtil";
import { connect } from "react-redux";
import { setAlertAction } from "../../store/actions/Alert";

class UserCreateAndEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: ERole.REGULAR,
      name: "",
    };
    this.userId = this.props.match.params.id;
  }

  async componentDidMount() {
    if (this.userId) {
      const response = await UserUtil.getUserById(this.userId);
      console.log(response);
      if (response) {
        this.setState({
          email: response.email,
          password: "",
          role: response.role,
          name: response.name,
        });
      }
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const notValid = GenUtil.validateUserBeforeSubmit(this.state);
    if (notValid) {
      this.props.setAlertAction(notValid, "error");
      return;
    }
    let data;
    if (this.userId) {
      data = await UserUtil.editUser(this.userId, this.state);
    } else {
      data = await UserUtil.createUser(this.state);
    }
    if (Object.keys(data).length) {
      this.props.setAlertAction(
        `User has been ${this.userId ? "Updated" : "Created"} Successfully!`,
        "success"
      );
    } else {
      this.props.setAlertAction("Something went wrong!", "error");
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
          type={this.userId ? "Edit" : "Create"}
        />
      </div>
    );
  }
}

export default connect(null, { setAlertAction })(UserCreateAndEdit);
