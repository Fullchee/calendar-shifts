import React from "react";
import PropTypes from "prop-types";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class Calendar extends React.Component {
  handleDayClick = (day, { selected }) => {
    const { selectedDays } = this.props;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.props.onUpdate(selectedDays);
  };

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.props.selectedDays}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  onUpdate: PropTypes.func,
  selectedDays: PropTypes.array
};
