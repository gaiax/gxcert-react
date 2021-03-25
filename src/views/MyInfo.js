import "./MyInfo.css";
import React from "react";
import { Link } from "react-router-dom";

class MyInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      icon: props.icon,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      address: nextProps.address,
      icon: nextProps.icon,
    }
  }
  render() {
    return (
      <div className="myinfo">
        <img className="myinfo-image" alt="GxCert icon" src={this.state.icon} />
        <div className="myinfo-right">
          <div className="myinfo-address">
            { "Your ID: " + this.state.address }
          </div>
          <Link className="myinfo-register" to="/user">Register your user info</Link>
        </div>
      </div>
    );
  }
}

export {
  MyInfoComponent
}
