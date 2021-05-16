import React from "react";
import { Modal, Button } from "react-bootstrap";
import CommunicationLoading from "./Loading";
import "./BsModal.css";

export default class BsIssueModal extends React.Component {
  render() {
    let modal = null;
    if (this.props.isLoading) {
      modal = (
        <Modal show={this.props.show} animation={true} >
          <Modal.Body>
            <CommunicationLoading />
            <p className="issue-modal-message">
              Issuing certificate...
            </p>
          </Modal.Body>
        </Modal>
      );
    } else if (this.props.error) {
      modal = (
        <Modal show={this.props.show} animation={true} >
          <Modal.Body>
            <img src="/close.png" className="close-button" onClick={this.props.closeModal} />
            <br/>
            <div className="issued-image-wrapper">
              <img className="issued-image" />
            </div>
            <p className="issue-modal-message">Failed to issue certificate.</p>
            <div className="issued-button-wrapper">
              <button className="issue-modal-close" onClick={this.props.closeModal}>Close</button>
            </div>
          </Modal.Body>
        </Modal>
      )
    } else {
      modal = (
        <Modal show={this.props.show} animation={true} >
          <Modal.Body>
            <img src="/close.png" className="close-button" onClick={this.props.closeModal} />
            <br/>
            <div className="issued-image-wrapper">
              <img src="/check.png" className="issued-image" />
            </div>
            <p className="issue-modal-message">Successfully Issued.</p>
            <div className="issued-button-wrapper">
              <button className="issue-modal-close" onClick={this.props.closeModal}>Close</button>
            </div>
          </Modal.Body>
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
