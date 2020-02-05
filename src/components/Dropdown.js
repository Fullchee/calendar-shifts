import React from "react";
import PropTypes from "prop-types";
import formatShift from "./formatShift";
export default class Dropdown extends React.Component {
  render() {
    return (
      <select name="shifts" id="shift-select" onChange={this.props.onChange}>
        <option value="">--Shifts--</option>
        {this.props.list.map(shift => {
          const shiftString = JSON.stringify(shift);
          return (
            <option value={shiftString} key={shiftString}>
              {formatShift(shift)}
            </option>
          );
        })}
      </select>
    );
  }
}

Dropdown.propTypes = {
  list: PropTypes.array,
  onChange: PropTypes.func
};
