import React from "react";
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
      shift: this.props.selectedShift || DEFAULT_SHIFT
    };
  }
  onChange = shift => this.setState({ shift });

  componentDidUpdate(prevProps) {
    if (this.props.selectedShift !== prevProps.selectedShift) {
      this.setState({
        shift: this.props.selectedShift
      });
    }
  }

  confirmDelete = e => {
    e.preventDefault();
    confirmAlert({
      title: `Delete shift "${formatShift(this.props.selectedShift)}"?`,
      message: "",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.onDelete();
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
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
            <label htmlFor="modal-select-shift">Shift to edit</label>
            <Dropdown
              id="modal-select-shift"
              title="Select shift"
              list={this.props.shifts}
              value={this.props.selectedShift}
              onChange={this.props.onDropdownChange}
            ></Dropdown>
            <label htmlFor="range-picker"></label>
            <div id="range-picker" className="range-picker">
              <TimeRangePicker
                onChange={this.onChange}
                value={this.state.shift}
              />
            </div>
            <button className="btn btn--delete" onClick={this.confirmDelete}>
              Delete
            </button>
            <div className="cancel-create">
              <button className="btn btn--close" onClick={this.props.onClose}>
                Close
              </button>
              <button
                className="btn btn--primary btn--create"
                onClick={this.props.onCreate(this.state.shift)}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
