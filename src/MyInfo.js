import "./MyInfo.css";
import React from "react";
import { Link } from "react-router-dom";

class MyInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
    }
  }
  render() {
    return (
      <div className="myinfo">
        <img className="myinfo-image" />
        <div className="myinfo-right">
          <p className="myinfo-address">
            { this.state.address.substr(0, 32) + "..." }
          </p>
          <Link className="myinfo-register" to="/user">Register your user info</Link>
        </div>
      </div>
    );
  }
}

export {
  MyInfoComponent
}
