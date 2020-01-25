import React from "react";
import ApiCalendar from "react-google-calendar-api";
import Calendar from "./Calendar";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: []
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
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
    }
  };

  updateSelectedDays = selectedDays => {
    this.setState({ selectedDays });
    console.log(selectedDays);
  };

  createEvent = e => {
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
      </>
    );
  }
}
