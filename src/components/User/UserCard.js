import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class UserCard extends Component {
  render() {
    const { user, editUser, deleteUser, showEditAndDelete } = this.props;
    const { name, email, role } = user;
    return (
      <Card style={{ width: "20vw", margin: "20px" }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h6" component="h2">
            {email}
          </Typography>
          <Typography color="textSecondary">{role}</Typography>
        </CardContent>
        {showEditAndDelete ? (
          <CardActions>
            <Button color={"primary"} onClick={() => editUser()} size="small">
              Edit Trip
            </Button>
            <Button
              color={"secondary"}
              onClick={() => deleteUser()}
              size="small"
            >
              Delete Trip
            </Button>
          </CardActions>
        ) : null}
      </Card>
    );
  }
}

UserCard.propTypes = {};

export default UserCard;
