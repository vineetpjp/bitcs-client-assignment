import React, { Component } from "react";
import { connect } from "react-redux";

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      let { auth } = this.props;
      if (!auth.loading && auth.isAuthenticated) {
        this.props.history.push("/trips");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
