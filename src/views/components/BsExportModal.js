import React from "react";
import { Modal, Button } from "react-bootstrap";
import CommunicationLoading from "./Loading";
import "./BsModal.css";

export default class BsExportModal extends React.Component {
  render() {
    return (
      <div className="modal">
        <Modal show={true} animation={true} >
          <Modal.Body>
            <p className="message">Choose way to export account.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.exportFile} >
              Export as a file
            </Button>
            <Button variant="primary" onClick={this.props.copyAccount} >
              Copy to the clipboard
            </Button>
            <Button variant="primary" onClick={this.props.closeExportModal} >
              Back
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
