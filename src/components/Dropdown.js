import React from "react";
export default class Dropdown extends React.Component {
  /**
   * formatTime('["09:00","17:00"]') => 9 AM - 5 PM
   */
  formatTime = shift => {
    return JSON.parse(shift)
      .map(this.militaryToAMPM)
      .join(" - ");
  };
  /**
   * military("09:00") => 9:00AM
   */
  militaryToAMPM = time => {
    var H = +time.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 ? "AM" : "PM";
    return h + time.substr(2, 3) + ampm;
  };
  render() {
    return (
      <select name="shifts" id="shift-select" onChange={this.props.onChange}>
        <option disabled value="">
          --Shifts--
        </option>
        {this.props.list.map(shift => {
          const time = JSON.stringify(shift);
          return (
            <option value={time} key={time}>
              {this.formatTime(time)}
            </option>
          );
        })}
      </select>
    );
  }
}
