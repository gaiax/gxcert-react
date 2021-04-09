import "./MyInfo.css";
import React from "react";
import { Link } from "react-router-dom";
import { copyText } from "../util";

class MyInfoComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      address: nextProps.address,
      icon: nextProps.icon,
    }
  }
  copyId() {
    copyText(this.props.address);
    this.props.onCopyId();
  }
  render() {
    return (
      <div className="myinfo">
        <img className="myinfo-image" alt="GxCert icon" src={this.props.icon} />
        <div className="myinfo-right">
          <div className="myinfo-address">
            { "Your ID: " + this.props.address }
          </div>
          <div className="myinfo-buttons">
            <a href="javascript:void(0)" className="copy-button" onClick={this.copyId.bind(this)}>Copy ID</a> | <Link className="myinfo-register" to="/user">Update your user info</Link> | <a href="javascript:void(0)" className="export-button" onClick={this.props.exportAccount}>Export Account</a> | <a href="javascript:void(0)" className="logout-button" onClick={this.props.logout}>Logout</a>
          </div>
        </div>
      </div>
    );
  }
}

export {
  MyInfoComponent
}
