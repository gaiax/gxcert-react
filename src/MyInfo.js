import "./MyInfo.css";
import React from "react";

class MyInfoComponent extends React.Component {
  render() {
    return (
      <div className="myinfo">
        <img />
        <div className="myinfo-right">
          <p className="myinfo-address">
            { this.state.address }
          </p>
          <button className="myinfo-register">Register your user info</button>
        </div>
      </div>
    );
  }
}
