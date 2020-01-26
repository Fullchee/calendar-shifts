import React from "react";
import EventCreator from "./EventCreator";
import ApiCalendar from "react-google-calendar-api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: false
    };
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(this.signUpdate);
      debugger;
      this.setState({ sign: ApiCalendar.sign });
    });
  }
  /**
   * @param {boolean} sign - whether the user is logged in
   *
   * Called when the user logs in or logs out
   */
  signUpdate = sign => {
    debugger;
    this.setState({ sign });
  };
  render() {
    if (this.state.sign) {
      return <EventCreator></EventCreator>;
    } else {
      debugger;
      return (
        <div>
          <div className="description">
            <p>Quickly add your work shifts to Google Calendar</p>
          </div>
          <button
            className="btn"
            onClick={() => {
              ApiCalendar.handleAuthClick();
            }}
          >
            Sign in
          </button>
        </div>
      );
    }
  }
}
