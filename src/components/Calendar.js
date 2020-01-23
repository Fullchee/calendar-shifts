import React from "react";
import ApiCalendar from "react-google-calendar-api";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
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

  createEvent = e => {
    const eventFromNow = {
      summary: "Poc Dev From Now",
      time: 480
    };

    // ApiCalendar.createEventFromNow(eventFromNow)
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

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
