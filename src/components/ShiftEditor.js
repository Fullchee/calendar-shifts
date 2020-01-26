import React from "react";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

export default class ShiftEditor extends React.Component {
  constructor(props) {
    super(props);
    const DEFAULT_SHIFT = ["09:00", "17:00"];
    this.state = {
      shift: this.props.shift || DEFAULT_SHIFT
    };
  }
  onChange = shift => this.setState({ shift });

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    return (
      <div>
        <div>
          <TimeRangePicker onChange={this.onChange} value={this.state.shift} />
        </div>
        <div>
          <button onClick={this.props.onCreate(this.state.shift)}>
            Create
          </button>
          <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}
