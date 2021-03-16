import React from "react";


class IssueComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="issue">
        <h2 className="issue-title">Issue Certificate</h2>
        <h4 className="issue-image-title">Certificate Image</h4>
        <input type="text" id="issue-image" className="issue-image" />
        <h4 className="issue-to-title">To</h4>
        <input type="text" id="issue-to" className="issue-to" />
        <button className="issue-button" id="issue-button" />
      </div>
    );
  }
}

export {
  IssueComponent,
}
