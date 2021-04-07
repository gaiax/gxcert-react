import React from "react";
import CertClient from "../client";
import { getImageOnIpfs } from "../image-upload";
import "./User.css";

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchProfile(id);
    if (!this.props.icon) {
      return;
    }
  }
  render() {
    return (
      <div className="user">
        <img src={this.props.imageUrl} className="user-icon" />
        <h2 className="user-name">
          { this.props.name }
        </h2>
      </div>
    );
  }
}

export default UserComponent;
