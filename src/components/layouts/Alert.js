import React, { Component } from "react";
import { connect } from "react-redux";

class Alert extends Component {
  render() {
    let alerts = this.props.alerts;

    return (
      alerts?.length > 0 &&
      alerts.map((alert) => {
        return (
          <div key={alert.Id} className={`alert ${alert.alertType}`}>
            {alert.msg}
          </div>
        );
      })
    );
  }
}

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

export default connect(mapStateToProps)(Alert);
