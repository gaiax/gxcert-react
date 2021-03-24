import React from "react";
import { Modal, Button } from "react-bootstrap";
import CommunicationLoading from "./Loading";

export default class BsModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClickBackButton = props.onClickBackButton;
    this.state = {
      show: props.show,
      isLoading: props.isLoading,
      message: props.message,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      show: nextProps.show !== undefined ? nextProps.show : prevState.show,
      isLoading: nextProps.isLoading !== undefined ? nextProps.isLoading : prevState.isLoading,
      message: nextProps.message !== undefined ? nextProps.message : prevState.message,
    }
  }
  render() {
    let modal = null;
    if (this.state.isLoading) {
      modal = (
        <Modal show={this.state.show} animation={true} >
          <Modal.Body>
            <CommunicationLoading />
          </Modal.Body>
        </Modal>
      );
    } else if (this.state.message !== null) {
      console.log(this.state.message);
      modal = (
        <Modal show={this.state.show} animation={true} >
          <Modal.Body>
            { this.state.message }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.onClickBackButton} >
              Back
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div className="modal">
        { modal }
      </div>
    );
  }
}
