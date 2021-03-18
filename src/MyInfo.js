import "./MyInfo.css";
import React from "react";

class MyInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      register: props.register,
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
          <button className="myinfo-register" onClick={this.state.register} >Register your user info</button>
        </div>
      </div>
    );
  }
}

export {
  MyInfoComponent
}
