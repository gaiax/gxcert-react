import React from "react";
import "./Issue.css";
import "./reset.css";


class IssueComponent extends React.Component {
  render() {
    return (
      <div className="issue">
        <div className="issue-wrapper">
          <h2 className="issue-title">Issue Certificate</h2>
          <h5 className="issue-image-title issue-input-title">Certificate Image</h5>
          <input type="file" id="issue-image" className="issue-image issue-input" onChange={this.props.onChangeCertificateImage} />
          <h5 className="issue-to-title issue-input-title">Title</h5>
          <input type="text" id="issue-title" className="issue-input" onChange={this.props.onChangeTitle} /><br/>
          <h5 className="issue-to-description issue-input-title">Description</h5>
          <textarea id="issue-description" className="issue-description issue-input" onChange={this.props.onChangeDescription}></textarea><br/>
          <h5 className="issue-to-title issue-input-title">To</h5>
          <input type="text" id="issue-to" className="issue-to issue-input" onChange={this.props.onChangeIssueTo} /><br/>
          <button className="issue-button" id="issue-button" onClick={this.props.onClickIssueButton}>Issue</button>
        </div>
      </div>
    );
  }
}

export {
  IssueComponent,
}
