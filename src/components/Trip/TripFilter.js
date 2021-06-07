import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthUtil } from "../../utils/AuthUtil";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

class TripFilter extends Component {
  render() {
    let {
      min_start_date,
      max_start_date,
      min_end_date,
      max_end_date,
      next_month_plan,
      own_trips,
    } = this.props.filter;
    let onChange = this.props.updateFilter;
    let isAdmin = AuthUtil.isAdmin(this.props.auth);
    return (
      <div
        className={"center_vertical"}
        style={{ position: "fixed", top: "12vh", left: "5vh" }}
      >
        <form className={"form"}>
          <label htmlFor={"min_start_date"}>min_start_date</label>
          <TextField
            id={"min_start_date"}
            onChange={(e) => onChange(e)}
            type="date"
            name="min_start_date"
            placeholder="min_start_date"
            value={min_start_date}
            disabled={next_month_plan}
          />
          <label htmlFor={"max_start_date"}>max_start_date</label>
          <TextField
            id={"max_start_date"}
            onChange={(e) => onChange(e)}
            type="date"
            name="max_start_date"
            placeholder="max_start_date"
            value={max_start_date}
            disabled={next_month_plan}
          />
          <label htmlFor={"min_end_date"}>min_end_date</label>
          <TextField
            id={"min_end_date"}
            onChange={(e) => onChange(e)}
            type="date"
            name="min_end_date"
            placeholder="min_end_date"
            value={min_end_date}
            disabled={next_month_plan}
          />

          <label htmlFor={"max_end_date"}>max_end_date</label>
          <TextField
            id={"max_end_date"}
            onChange={(e) => onChange(e)}
            type="date"
            name="max_end_date"
            placeholder="max_end_date"
            value={max_end_date}
            disabled={next_month_plan}
          />
          <label htmlFor={"next_month_plan"}>next_month_plan</label>
          <Checkbox
            id={"next_month_plan"}
            onChange={(e) => onChange(e)}
            type="checkbox"
            name="next_month_plan"
            placeholder="next_month_plan"
            checked={next_month_plan}
          />
          {isAdmin ? (
            <>
              <label htmlFor={"own_trips"}>own_trips</label>
              <Checkbox
                id={"own_trips"}
                onChange={(e) => onChange(e)}
                type="checkbox"
                name="own_trips"
                placeholder="own_trips"
                checked={own_trips}
              />
            </>
          ) : null}
        </form>
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={() => this.props.applyFilter()}
        >
          Apply filter
        </Button>
      </div>
    );
  }
}
let mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(TripFilter);
