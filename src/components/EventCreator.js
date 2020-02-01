import React from "react";
import ApiCalendar from "react-google-calendar-api";
import Calendar from "./Calendar";
import ShiftEditor from "./ShiftEditor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "./Dropdown";
import formatShift from "./formatShift";
import defaultShifts from "./defaultShifts";

const DEFAULT_SHIFT = ["07:30", "15:30"];

export default class EventCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      shifts: defaultShifts,
      selectedShift: DEFAULT_SHIFT,
      showShiftEditor: false,
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
    if (!this.state.selectedDays.length) {
      toast("Make sure to select days on the calendar");
      return;
    }
    if (!this.state.title) {
      toast("Make sure to enter a title for your events");
      return;
    }
    this.state.selectedDays.forEach(day => {
      ApiCalendar.createEvent(this.calculateEvent(day), "primary")
        .then(result => {
          console.log(result);
          toast("Created calendar event on " + this.formatDate(day));
        })
        .catch(error => {
          console.log(error);
          toast("Failed to create event on " + this.formatDate(day));
        });
    });
  };

  calculateEvent = day => {
    const [start, end] = this.state.selectedShift;

    const startDate = this.combineDateAndTime(day, start);
    let endDate = this.combineDateAndTime(day, end);

    // shift goes to the next day
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    return {
      start: {
        dateTime: startDate
      },
      end: {
        dateTime: endDate
      },
      summary: this.state.title,
      description: this.state.description
    };
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
    this.setState({ showShiftEditor: true });
  };

  /**
   * Currying: time is provided by the bottom TimePicker component
   * @param {["HH:MM", "HH:MM"]} time
   */
  createShift = selectedShift => {
    return () => {
      if (
        this.state.shifts.find(
          shift =>
            shift[0] === selectedShift[0] && shift[1] === selectedShift[1]
        )
      ) {
        toast(`The ${formatShift(selectedShift)} shift already exists`);
      } else {
        this.setState({
          shifts: [...this.state.shifts, selectedShift],
          selectedShift: selectedShift
        });
        toast(`Created the new shift: ${formatShift(selectedShift)}`);
      }
    };
  };
  deleteShift = selectedShift => {
    return () => {
      const index = this.state.shifts.findIndex(
        shift => shift[0] === selectedShift[0] && shift[1] === selectedShift[1]
      );
      if (index !== -1) {
        const newShiftList = [
          ...this.state.shifts.slice(0, index),
          ...this.state.shifts.slice(index + 1)
        ];
        this.setState({
          shifts: newShiftList
        });

        // selected shift was deleted
        if (
          selectedShift[0] === this.state.selectedShift[0] &&
          selectedShift[1] === this.state.selectedShift[1]
        ) {
          this.setState({
            selectedShift:
              (newShiftList.length && newShiftList[0]) || DEFAULT_SHIFT
          });
        }
        toast(`Deleted shift ${formatShift(selectedShift)}`);
      } else {
        toast(
          `Shift ${formatShift(
            selectedShift
          )} not found! It might already be deleted.`
        );
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
        <div className="user-input">
          <div>
            <label>
              Event Title
              <input
                required
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
            isVisible={this.state.showShiftEditor}
            onCreate={this.createShift}
            onDelete={this.deleteShift}
            onClose={() => this.setState({ showShiftEditor: false })}
            shifts={this.state.shifts}
          ></ShiftEditor>
          <button className="btn" onClick={this.createEvent}>
            Create calendar events!
          </button>
        </div>
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
