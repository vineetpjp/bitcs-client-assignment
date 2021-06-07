import React, { Component } from "react";
import TripForm from "./TripForm";
import { TripUtil } from "../../utils/TripUtil";
import { connect } from "react-redux";
import history from "../../history";
import { GenUtil } from "../../utils/GenUtil";
import { setAlertAction } from "../../store/actions/Alert";

class TripCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      startDate: "",
      endDate: "",
      comment: "",
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const notValid = GenUtil.validateTripBeforeSubmit(this.state);
    if (notValid) {
      this.props.setAlertAction(notValid, "error");
      return;
    }
    await TripUtil.createTrip(this.state);
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
          type={"create"}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { setAlertAction })(TripCreate);
