import React from "react";
import "./Modal.css";
import Modal from "react-modal";
import CommunicationLoading from "./Loading";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)"
  },
  content: {
    position: "absolute",
    top: "200px",
    width: "240px",
    height: "240px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#DDD",
    borderRadius: "1rem",
    padding: "2.5rem",
  }
};

class GxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      isLoading: props.isLoading,
      message: props.message,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      isOpen: nextProps.isOpen !== undefined ? nextProps.isOpen : prevState.isOpen,
      isLoading: nextProps.isLoading !== undefined ? nextProps.isLoading : prevState.isLoading,
      message: nextProps.message !== undefined ? nextProps.message : prevState.message,

    }
  }
  render() {
    return (
      <Modal isOpen={this.state.isOpen} style={modalStyle}>
        { this.state.isLoading ? <CommunicationLoading /> : "" }
        { this.state.message !== undefined ? this.state.message : "" }
      </Modal>
    );
  }
}

export default GxModal;
