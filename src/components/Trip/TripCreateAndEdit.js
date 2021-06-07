import React, { Component } from "react";
import TripForm from "./TripForm";
import { TripUtil } from "../../utils/TripUtil";
import history from "../../history";
import { GenUtil } from "../../utils/GenUtil";
import { connect } from "react-redux";
import { setAlertAction } from "../../store/actions/Alert";

class TripCreateAndEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      startDate: "",
      endDate: "",
      comment: "",
    };
    this.tripId = props.match.params.id;
  }

  async componentDidMount() {
    if (this.tripId) {
      const response = await TripUtil.getTripById(this.tripId);
      if (response) {
        this.setState({
          destination: response.destination,
          startDate: response.startDate,
          endDate: response.endDate,
          comment: response.comment,
        });
      }
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const notValid = GenUtil.validateTripBeforeSubmit(this.state);
    if (notValid) {
      this.props.setAlertAction(notValid, "error");
      return;
    }
    let data;
    if (this.tripId) {
      data = await TripUtil.editTrip(this.tripId, this.state);
      this.props.setAlertAction("Trip Updated Successfully!", "success");
    } else {
      data = await TripUtil.createTrip(this.state);
      this.props.setAlertAction("Trip Created Successfully!", "success");
    }
    if (Object.keys(data).length) {
      this.props.setAlertAction(
        `Trip has been ${this.tripId ? "Updated" : "Created"} Successfully!`,
        "success"
      );
    } else {
      this.props.setAlertAction("Something went wrong!", "error");
    }
    history.push("/trips");
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
        <TripForm
          data={this.state}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          type={this.tripId ? "Edit" : "Create"}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { setAlertAction })(TripCreateAndEdit);
