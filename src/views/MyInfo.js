import "./MyInfo.css";
import React from "react";
import { Link } from "react-router-dom";

class MyInfoComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      address: nextProps.address,
      icon: nextProps.icon,
    }
  }
  render() {
    return (
      <div className="myinfo">
        <img className="myinfo-image" alt="GxCert icon" src={this.props.icon} />
        <div className="myinfo-right">
          <div className="myinfo-address">
            { "Your ID: " + this.props.address }
          </div>
          <Link className="myinfo-register" to="/user">Register your user info</Link>
          <br/>
          <a href="javascript:void(0)" onClick={this.props.exportAccount}>Export Account</a>
        </div>
      </div>
    );
  }
}

export {
  MyInfoComponent
}
