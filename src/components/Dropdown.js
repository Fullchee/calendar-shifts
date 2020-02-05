import React from "react";
import PropTypes from "prop-types";
import formatShift from "./formatShift";
export default class Dropdown extends React.Component {
  render() {
    return (
      <select
        name="shifts"
        id={this.props.id}
        className="input hours-dropdown"
        onChange={this.props.onChange}
        value={JSON.stringify(this.props.value)}
      >
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
