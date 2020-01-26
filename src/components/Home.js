import React from "react";
import ApiCalendar from "react-google-calendar-api";
import Calendar from "./Calendar";
import ShiftCreator from "./ShiftCreator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import defaultShifts from "./defaultShifts";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: defaultShifts,
      shifts: [],
      selectedShift: null,
      showTimeRange: false
    };
  }

  listEvents = () => {
    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log(result.items);
      });
  };

  handleItemClick = (event, name) => {
    if (name === "sign-in") {
      ApiCalendar.handleAuthClick();
      toast("Signed in to Google Calendar! 📅");
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
      toast("Signed out!");
    }
  };

  updateSelectedDays = selectedDays => {
    this.setState({ selectedDays });
  };

  createEvent = () => {
    if (!this.state.selectedShift) {
      toast("Please create a toast first!");
    }
    ApiCalendar.createEvent(
      {
        start: {
          dateTime: new Date()
        },
        end: {
          dateTime: new Date()
        },
        summary: "Title!!",
        description: "Description!!"
      },
      "primary"
    )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };
  showShiftCreator = () => {
    this.setState({ showTimeRange: true });
  };

  /**
   * Currying: time is provided by the bottom TimePicker component
   * @param {["HH:MM", "HH:MM"]} time
   */
  createShift = time => {
    return () => {
      this.setState({ shifts: [...this.state.shifts, time] });
    };
  };
  render() {
    return (
      <>
        <Calendar
          selectedDays={this.state.selectedDays}
          onUpdate={this.updateSelectedDays}
        ></Calendar>
        <button onClick={e => this.handleItemClick(e, "sign-in")}>
          sign-in
        </button>
        <button onClick={e => this.handleItemClick(e, "sign-out")}>
          sign-out
        </button>
        <button onClick={this.createEvent}>Create event</button>
        <button onClick={this.showShiftCreator}>Create a shift</button>
        <ShiftCreator
          isVisible={this.state.showTimeRange}
          onCreate={this.createShift}
        ></ShiftCreator>
      </>
    );
  }
}
