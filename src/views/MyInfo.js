import "./MyInfo.css";
import React from "react";
import { Link } from "react-router-dom";
import { copyText } from "../util";

class MyInfoComponent extends React.Component {
  copyId() {
    copyText(this.props.address);
    this.props.onCopyId();
  }
  render() {
    let name = "";
    let imageUrl = "";
    if (this.props.profile && this.props.profile.nameInIpfs) {
      name = this.props.profile.nameInIpfs;
    }
    if (this.props.profile && this.props.profile.imageUrl) {
      imageUrl = this.props.profile.imageUrl;
    }
    return (
      <div className="myinfo">
        <img className="myinfo-image" alt="GxCert icon" src={imageUrl} />
        <div className="myinfo-right">
          <div className="myinfo-name">
            { name }
          </div>
          <div className="myinfo-address">
            { "Your ID: " + this.props.address }
          </div>
          <div className="myinfo-buttons">
            <a href="javascript:void(0)" className="copy-button" onClick={this.copyId.bind(this)}>Copy ID</a> | <Link className="myinfo-register" to="/user">Update your profile</Link> | <a href="javascript:void(0)" className="export-button" onClick={this.props.openExportModal}>Export Account</a> | <a href="javascript:void(0)" className="logout-button" onClick={this.props.logout}>Logout</a>
          </div>
        </div>
      </div>
    );
  }
}

export {
  MyInfoComponent
}
