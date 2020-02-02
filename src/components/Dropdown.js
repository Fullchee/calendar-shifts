import React from "react";
import formatShift from "./formatShift";
export default class Dropdown extends React.Component {
  render() {
    return (
      <select
        name="shifts"
        id="shift-select"
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
