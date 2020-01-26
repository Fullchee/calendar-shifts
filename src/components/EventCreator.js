import React from "react";
import ApiCalendar from "react-google-calendar-api";
import Calendar from "./Calendar";
import ShiftEditor from "./ShiftEditor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "./Dropdown";

// import "react-toastify/dist/ReactToastify.min.css";
import defaultShifts from "./defaultShifts";

export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      shifts: defaultShifts,
      selectedShift: null,
      showTimeRange: false,
      title: "",
      description: ""
    };
  }

  listEvents = () => {
    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log(result.items);
      });
  };

  updateSelectedDays = selectedDays => {
    this.setState({ selectedDays });
  };

  createEvent = () => {
    if (!this.state.selectedShift) {
      toast("Make sure to select a shift");
      return;
    }
    if (this.state.selectedDays.length === 0) {
      toast("Make sure to select days on the calendar");
      return;
    }
    const [start, end] = this.state.selectedShift;
    this.state.selectedDays.forEach(day => {
      ApiCalendar.createEvent(
        {
          start: {
            dateTime: this.combineDateAndTime(day, start)
          },
          end: {
            dateTime: this.combineDateAndTime(day, end)
          },
          summary: this.state.title,
          description: this.state.description
        },
        "primary"
      )
        .then(result => {
          console.log(result);
          toast(
            "Created calendar event on " + this.formatDate(this.formatDate(day))
          );
        })
        .catch(error => {
          console.log(error);
          toast("Failed to create event on " + this.formatDate(day));
        });
    });
  };

  /**
   * @param {Date} date
   * @param {"hh:mm"} time
   * @returns {Date}
   */
  combineDateAndTime = (date, time) => {
    const [hh, mm] = time.split(":").map(Number);
    let newDate = new Date(date);
    // Calendar: gets the day at noon
    newDate.setHours(newDate.getHours() - 12 + hh);
    newDate.setMinutes(newDate.getMinutes() + mm);
    return newDate;
  };

  formatDate = timestamp => {
    const date = new Date(timestamp);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    return (
      months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    );
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
      if (this.state.shifts.find(shift => shift === time)) {
        toast(`The ${time} shift already exists`);
      } else {
        this.setState({ shifts: [...this.state.shifts, time] });
        toast(`Created the new shift: ${time}`);
      }
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
          <label>
            Event Title
            <input
              type="text"
              name="title"
              onChange={e => this.setState({ title: e.target.value })}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Event Description
            <textarea
              name="Title"
              onChange={e => this.setState({ description: e.target.value })}
            ></textarea>
          </label>
        </div>
        <div>
          <Dropdown
            title="Select shift"
            list={this.state.shifts}
            onChange={e =>
              this.setState({ selectedShift: JSON.parse(e.target.value) })
            }
          ></Dropdown>
          <button className="btn" onClick={this.showShiftEditor}>
            Manage Shifts
          </button>
        </div>
        <ShiftEditor
          isVisible={this.state.showTimeRange}
          onCreate={this.createShift}
          onClose={() => this.setState({ showTimeRange: false })}
        ></ShiftEditor>
        <button className="btn" onClick={this.createEvent}>
          Add shifts!
        </button>
        <div>
          <button
            className="btn"
            onClick={() => {
              ApiCalendar.handleSignoutClick();
              toast("Signed out!");
            }}
          >
            Sign out
          </button>
        </div>
      </>
    );
  }
}
