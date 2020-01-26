import React from "react";
import ApiCalendar from "react-google-calendar-api";
import Calendar from "./Calendar";
import ShiftEditor from "./ShiftEditor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "./Dropdown";

// import "react-toastify/dist/ReactToastify.min.css";
import defaultShifts from "./defaultShifts";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      shifts: defaultShifts,
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
  showShiftEditor = () => {
    this.setState({ showTimeRange: true });
  };

  /**
   * Currying: time is provided by the bottom TimePicker component
   * @param {["HH:MM", "HH:MM"]} time
   */
  createShift = time => {
    return () => {
      // TODO: keep it sorted
      // TODO: prevent duplicates
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
        <div>
          <button onClick={() => ApiCalendar.handleAuthClick()}>Sign in</button>
        </div>
        <div>
          <Dropdown
            title="Select shift"
            list={this.state.shifts}
            onChange={e =>
              this.setState({ selectedShift: JSON.parse(e.target.value) })
            }
          ></Dropdown>
          <button onClick={this.showShiftEditor}>Create a shift</button>
        </div>
        <ShiftEditor
          isVisible={this.state.showTimeRange}
          onCreate={this.createShift}
          onClose={() => this.setState({ showTimeRange: false })}
        ></ShiftEditor>
        <button onClick={this.createEvent}>Create event</button>
      </>
    );
  }
}
