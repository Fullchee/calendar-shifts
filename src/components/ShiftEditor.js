import React from "react";
import PropTypes from "prop-types";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import Dropdown from "./Dropdown";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import formatShift from "./formatShift";

export default class ShiftEditor extends React.Component {
  constructor(props) {
    super(props);
    const DEFAULT_SHIFT = ["09:00", "17:00"];
    this.state = {
      shift: this.props.shift || DEFAULT_SHIFT
    };
  }
  onChange = shift => this.setState({ shift });

  confirm = () => {
    confirmAlert({
      title: `Delete shift "${formatShift(this.state.shift)}"?`,
      message: "",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            debugger;
            this.props.onDelete(this.state.shift)();
          }
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ]
    });
  };

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    return (
      <div>
        <div>
          <TimeRangePicker onChange={this.onChange} value={this.state.shift} />
        </div>
        <Dropdown
          title="Select shift"
          list={this.props.shifts}
          onChange={e => this.setState({ shift: JSON.parse(e.target.value) })}
        ></Dropdown>
        <div>
          <button onClick={this.props.onCreate(this.state.shift)}>
            Create
          </button>
          <button onClick={this.confirm}>Delete</button>
          <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}

ShiftEditor.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  shift: PropTypes.array,
  shifts: PropTypes.array
};
