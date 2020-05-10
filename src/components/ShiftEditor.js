import React from "react";
import PropTypes from "prop-types";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import Dropdown from "./Dropdown";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import formatShift from "./formatShift";
import Modal from "react-modal";
Modal.setAppElement("#root");
const DEFAULT_SHIFT = ["07:30", "15:30"];

export default class ShiftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shift: this.props.selectedShift || DEFAULT_SHIFT,
    };
  }
  onChange = (shift) => this.setState({ shift });

  componentDidUpdate(prevProps) {
    if (this.props.selectedShift !== prevProps.selectedShift) {
      this.setState({
        shift: this.props.selectedShift,
      });
    }
  }

  confirmDelete = (e) => {
    e.preventDefault();
    confirmAlert({
      title: `Delete shift "${formatShift(this.props.selectedShift)}"?`,
      message: "",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.onDelete();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    return (
      <Modal isOpen={this.props.isVisible} onRequestClose={this.props.onClose}>
        <div className="modal">
          <form className="form">
            <div className="btn btn--close" onClick={this.props.onClose}>
              <p className="btn--close--content">x</p>
            </div>
            <label htmlFor="range-picker">Create shift</label>
            <TimeRangePicker
              id="range-picker"
              className="range-picker"
              onChange={this.onChange}
              value={this.state.shift}
              disableClock={true}
              amPmAriaLabel="Select AM/PM"
              clearAriaLabel="Clear hour range value"
            />
            <button
              className="btn btn--primary btn--create"
              onClick={this.props.onCreate(this.state.shift)}
            >
              Create
            </button>
            <hr />
            <hr />
            <hr />
            <label htmlFor="modal-select-shift">Delete selected shift</label>
            <Dropdown
              id="modal-select-shift"
              title="Select shift"
              list={this.props.shifts}
              value={this.props.selectedShift}
              onChange={this.props.onDropdownChange}
            ></Dropdown>
            <button className="btn btn--delete" onClick={this.confirmDelete}>
              Delete
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

ShiftEditor.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  shift: PropTypes.array,
  shifts: PropTypes.array,
};
