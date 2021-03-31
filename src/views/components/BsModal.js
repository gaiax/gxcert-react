import React from "react";
import { Modal, Button } from "react-bootstrap";
import CommunicationLoading from "./Loading";

export default class BsModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClickBackButton = props.onClickBackButton;
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
    if (this.props.isLoading) {
      modal = (
        <Modal show={this.props.show} animation={true} >
          <Modal.Body>
            <CommunicationLoading />
          </Modal.Body>
        </Modal>
      );
    } else if (this.props.message !== null) {
      modal = (
        <Modal show={this.props.show} animation={true} >
          <Modal.Body>
            { this.props.message }
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
