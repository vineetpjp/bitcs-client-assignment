import React, { Component } from "react";
import { TripUtil } from "../../utils/TripUtil";
import { setAlertAction } from "../../store/actions/Alert";
import { connect } from "react-redux";
import history from "../../history";
import TripFilter from "./TripFilter";
import { AuthUtil } from "../../utils/AuthUtil";
import { ERole } from "../../constant/Roles";
import TripCard from "./TripCard";
import Button from "@material-ui/core/Button";

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      page: 0,
      filter: {
        min_start_date: "",
        max_start_date: "",
        min_end_date: "",
        max_end_date: "",
        next_month_plan: false,
        own_trips: false,
      },
    };
    this.role = AuthUtil.getRole(props.auth);
    this.currentUserid = AuthUtil.getLoggedInUserId(props.auth);
  }

  async componentDidMount() {
    await this.getTrips(this.state.page);
  }

  updateFilter = async (e) => {
    if (e.target.type === "checkbox") {
      this.setState((prevState) => ({
        ...prevState,
        filter: { ...this.state.filter, [e.target.name]: e.target.checked },
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        filter: { ...this.state.filter, [e.target.name]: e.target.value },
      }));
    }
  };

  getTrips = async (pageNo) => {
    let pageNumber = pageNo ?? this.state.page;
    const response = await TripUtil.getTrips(pageNumber, this.state.filter);
    console.log(this.currentUserid);
    console.log(response);
    if (response.length && pageNumber >= 0) {
      this.setState({
        ...this.state,
        trips: response,
        page: pageNumber,
      });
    } else {
      this.props.setAlertAction("No trips", "error");
    }
  };

  editTrip = async (id) => {
    history.push(`/trip/edit/${id}`);
  };

  deleteTrip = async (id) => {
    await TripUtil.deleteTrip(id);
    await this.getTrips(this.state.page);
    this.props.setAlertAction("Trip Deleted Successfully", "error");
  };

  daysDiffFromCurrentDate = (date) => {
    let currentDate = new Date();
    let tripStartDate = new Date(date);

    let Difference_In_Time = tripStartDate.getTime() - currentDate.getTime();

    return Math.round(Difference_In_Time / (1000 * 3600 * 24));
  };

  renderTrips = () => {
    let trips = this.state.trips;
    if (this.role === ERole.REGULAR) {
      trips = trips.filter((trip) => trip.userId === this.currentUserid);
    }
    return trips.map((trip) => {
      const tripDaysLeft = this.daysDiffFromCurrentDate(trip.startDate);
      const showEditAndDelete =
        this.role && this.role === ERole.MANAGER
          ? trip.userId == this.currentUserid
          : true;
      return (
        <div key={trip.id}>
          <TripCard
            editTrip={() => this.editTrip(trip.id)}
            deleteTrip={() => this.deleteTrip(trip.id)}
            trip={trip}
            showEditAndDelete={showEditAndDelete}
            tripDaysLeft={tripDaysLeft}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div className={"center_horizontal"}>
        <TripFilter
          applyFilter={this.getTrips}
          filter={this.state.filter}
          updateFilter={this.updateFilter}
        />
        <div style={{ marginLeft: "25vw", marginRight: "15vw" }}>
          <div>Page No - {this.state.page + 1}</div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {this.renderTrips()}
          </div>
          <div style={{ marginLeft: 20 }}>
            <Button
              variant={"outlined"}
              onClick={() => this.getTrips(this.state.page - 1)}
            >
              PREV
            </Button>
            <Button
              variant={"outlined"}
              onClick={() => this.getTrips(this.state.page + 1)}
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { setAlertAction })(Trips);
