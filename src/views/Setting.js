import React from "react";
import "./Setting.css";
import { fileInputToDataURL, createBlobFromImageDataURI, postCertificate } from "../image-upload";

class SettingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onClickUpdateButton = props.onClickUpdateButton;
  }
  render () {
    const that = this;
    return (
      <div className="setting">
        <div className="setting-wrapper">
          <h2 className="setting-title">
            User Settings
          </h2>
          <h5 className="setting-name-title setting-input-title">Your Name</h5>
          <input type="text" id="setting-name" className="setting-name setting-input" />
          <h5 className="setting-icon-title setting-input-title">Icon</h5>
          <input type="file" id="setting-icon" className="setting-icon setting-input" />
          <button className="setting-button" id="setting-button" onClick={async () => {
            let name = document.getElementById("setting-name").value.trim();
            if (name === "") {
              name = null;
            }
            let icon = null;
            try {
              const imageData = await fileInputToDataURL(document.getElementById("setting-icon"));
              const blob = createBlobFromImageDataURI(imageData);
              icon = await postCertificate(blob);
            } catch(err) {
              console.error(err);
            }
            that.onClickUpdateButton({
              name,
              icon,
            });
          }}>Update</button>
        </div>
      </div>
    );
  }
}

export {
  SettingComponent
}
