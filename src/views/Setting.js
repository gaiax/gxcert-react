import React from "react";
import "./Setting.css";

class SettingComponent extends React.Component {
  render () {
    return (
      <div className="setting">
        <div className="setting-wrapper">
          <h2 className="setting-title">
            User Settings
          </h2>
          <h5 className="setting-name-title setting-input-title">Your Name</h5>
          <input type="text" id="setting-name" className="setting-name setting-input" />
          <button className="setting-button" id="setting-button">Update</button>
        </div>
      </div>
    );
  }
}

export {
  SettingComponent
}
