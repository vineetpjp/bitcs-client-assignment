import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class TripForm extends Component {
  render() {
    const { destination, startDate, endDate, comment } = this.props.data;
    const { onChange, onSubmit } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className={"form"}>
          <div>
            <TextField
              onChange={(e) => onChange(e)}
              type="text"
              name="destination"
              placeholder="Destination"
              value={destination}
              required
            />
          </div>

          <label htmlFor={"start_date"}>start date</label>
          <div>
            <TextField
              id={"start_date"}
              onChange={(e) => onChange(e)}
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={startDate}
              min="2020-01-01"
              max="2099-12-31"
              required
            />
          </div>

          <label htmlFor={"end_date"}>end date</label>
          <div>
            <TextField
              id={"end_date"}
              onChange={(e) => onChange(e)}
              type="date"
              name="endDate"
              placeholder="End Date"
              value={endDate}
              min="2020-01-01"
              max="2099-12-31"
              required
            />
          </div>
          <div>
            <TextField
              onChange={(e) => onChange(e)}
              type="text"
              name="comment"
              placeholder="Comment"
              value={comment}
              required
            />
          </div>
          <div>
            <Button variant={"outlined"} onClick={onSubmit}>
              {this.props.type === "Edit" ? "Edit Trip" : "Create Trip"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default TripForm;
