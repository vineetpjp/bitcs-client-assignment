import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class TripCard extends Component {
  render() {
    const { trip, showEditAndDelete, tripDaysLeft, editTrip, deleteTrip } =
      this.props;
    const { comment, destination, startDate, endDate, id } = trip;
    return (
      <Card style={{ width: "50vh", margin: "20px" }}>
        <CardContent>
          {tripDaysLeft > 0 ? (
            <Typography color="textSecondary" gutterBottom>
              {tripDaysLeft} Days left for trip
            </Typography>
          ) : null}
          <Typography variant="h6" component="h2">
            {destination}
          </Typography>
          <Typography color="textSecondary">{comment}</Typography>
          <Typography variant="body2" component="p">
            startDate - {startDate}
          </Typography>
          <Typography variant="body2" component="p">
            endDate - {endDate}
          </Typography>
        </CardContent>
        {showEditAndDelete ? (
          <CardActions>
            <Button color={"primary"} onClick={() => editTrip()} size="small">
              Edit Trip
            </Button>
            <Button
              color={"secondary"}
              onClick={() => deleteTrip()}
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

export default TripCard;
