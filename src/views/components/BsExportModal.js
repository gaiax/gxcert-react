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
            <span className="close-button" onClick={this.props.closeExportModal}>x</span>
            <p className="modal-title-text">Seed Phrase</p>
            <p className="modal-body-text">You need the seed phrase in order to access your account when you change a browser or a laptop.<br/>Please save the seed phrase in safe place.</p>
            <div className="modal-warning">
              Please do not share the seed phrase with anyone.<br/> You will leak all data associated with your seed phrase.
            </div>
            <p className="modal-label">Your Seed Phrase</p>
            <div className="modal-seed-box">
              { this.props.seed }
            </div>
            <div className="modal-seed-buttons">
              <button onClick={this.props.copyAccount}>Copy to Clipboard</button>
              <a href="javascript:void(0)" onClick={this.props.exportFile}>Export as JSON file</a>

            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
