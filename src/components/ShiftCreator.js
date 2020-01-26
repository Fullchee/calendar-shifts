import React from "react";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

export default class ShiftCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ["10:00", "11:00"]
    };
  }
  onChange = time => this.setState({ time });

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    return (
      <div>
        <TimeRangePicker onChange={this.onChange} value={this.state.time} />
        <button onClick={this.props.onCreate(this.state.time)}>Create</button>
      </div>
    );
  }
}
