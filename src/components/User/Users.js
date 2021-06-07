import React, { Component } from "react";
import { connect } from "react-redux";
import { setAlertAction } from "../../store/actions/Alert";
import { UserUtil } from "../../utils/UserUtil";
import history from "../../history";
import { AuthUtil } from "../../utils/AuthUtil";
import { ERole } from "../../constant/Roles";
import UserCard from "./UserCard";
import Button from "@material-ui/core/Button";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 0,
    };
    this.role = AuthUtil.getRole(this.props.auth);
  }

  async componentDidMount() {
    await this.getUsers();
  }

  getUsers = async (pageNo) => {
    const pageNumber = pageNo ?? this.state.page;
    if (pageNumber < 0) {
      this.props.setAlertAction("No Users", "error");
      return;
    }
    const response = await UserUtil.getUsers(pageNumber);
    if (response.length) {
      this.setState({
        page: pageNumber,
        users: response,
      });
    } else {
      this.props.setAlertAction("No Users", "error");
    }
  };

  deleteUser = async (id) => {
    await UserUtil.deleteUser(id);
    await this.getUsers(this.state.page);
    this.props.setAlertAction("User deleted Successfully!", "success");
  };

  editUser = (id) => {
    history.push(`/user/edit/${id}`);
  };

  renderUsers = () => {
    const users = this.state.users;
    return users.map((user) => {
      const showEditAndDelete =
        this.role && this.role === ERole.MANAGER
          ? user.role != ERole.ADMIN
          : this.role && this.role === ERole.ADMIN;
      return (
        <div key={user.id}>
          <UserCard
            showEditAndDelete={showEditAndDelete}
            editUser={() => this.editUser(user.id)}
            deleteUser={() => this.deleteUser(user.id)}
            user={user}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div style={{ marginLeft: 20 }}>Page No - {this.state.page + 1}</div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {this.renderUsers()}
        </div>

        <div style={{ marginLeft: 20 }}>
          <Button
            variant={"outlined"}
            onClick={() => this.getUsers(this.state.page - 1)}
          >
            PREV
          </Button>
          <Button
            variant={"outlined"}
            onClick={() => this.getUsers(this.state.page + 1)}
          >
            NEXT
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { setAlertAction })(Users);
