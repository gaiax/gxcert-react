import React from "react";
import "./Issue.css";
import * as image from "./image";
import * as ipfs from "./ipfs";


class IssueComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onClickIssueButton = props.onClickIssueButton;
    this.state = {}
  }
  render() {
    const that = this;
    return (
      <div className="issue">
        <div className="issue-wrapper">
          <h2 className="issue-title">Issue Certificate</h2>
          <h5 className="issue-image-title issue-input-title">Certificate Image</h5>
          <input type="file" id="issue-image" className="issue-image issue-input" />
          <h5 className="issue-to-title issue-input-title">To</h5>
          <input type="text" id="issue-to" className="issue-to issue-input" /><br/>
          <button className="issue-button" id="issue-button" onClick={async () => {
            const address = document.getElementById("issue-to").value;
            const imageData = await image.fileInputToDataURL(document.getElementById("issue-image"));
            let ipfsHash = null;
            try {
              const blob = image.createBlobFromImageDataURI(imageData);
              ipfsHash = await ipfs.postCertificate(blob);
            } catch(err) {
              console.error(err);
              return;
            }
            that.onClickIssueButton({
              ipfsHash,
              address,
            });
          }}>Issue</button>
        </div>
      </div>
    );
  }
}

export {
  IssueComponent,
}
