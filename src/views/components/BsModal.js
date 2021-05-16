import React from "react";
import { Modal, Button } from "react-bootstrap";
import CommunicationLoading from "./Loading";
import "./BsModal.css";

export default class BsModal extends React.Component {
  render() {
    let modal = null;
    if (this.props.isLoading) {
      modal = (
        <Modal show={this.props.show} animation={true} >
          <Modal.Body>
            { this.props.message !== null ? (<p className="message">{ this.props.message }</p>) : "" }
            <CommunicationLoading />
          </Modal.Body>
        </Modal>
      );
    } else if (this.props.message !== null || this.props.errorMessage !== null) {
      let checkMark = "";
      if (this.props.message !== null && this.props.errorMessage === null) {
        checkMark = (
          <div className="center">
            <img src="/check.png" className="check-mark" />
          </div>
        );
      }
      modal = (
        <Modal show={this.props.show} animation={true} >
          <Modal.Body>
            <span className="close-button" onClick={this.props.closeModal} >x</span>
            {checkMark}
            <p className="message">{ this.props.message }</p>
            <p className="error-message">{ this.props.errorMessage }</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.closeModal} >
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
