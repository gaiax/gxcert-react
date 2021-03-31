import React from "react";
import "./Issue.css";


class IssueComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onClickIssueButton = props.onClickIssueButton;
    this.state = {}
  }
  render() {
    return (
      <div className="issue">
        <div className="issue-wrapper">
          <h2 className="issue-title">Issue Certificate</h2>
          <h5 className="issue-image-title issue-input-title">Certificate Image</h5>
          <input type="file" id="issue-image" className="issue-image issue-input" />
          <h5 className="issue-to-title issue-input-title">To</h5>
          <input type="text" id="issue-to" className="issue-to issue-input" /><br/>
          <button className="issue-button" id="issue-button" onClick={this.onClickIssueButton}>Issue</button>
        </div>
      </div>
    );
  }
}

export {
  IssueComponent,
}
