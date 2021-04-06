import React from "react";
import CertClient from "../client";
import { getImageOnIpfs } from "../image-upload";

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: null,
      name: "",
    }
  }
  async getProfile(id) {
    const client = CertClient();
    const profile = await client.getProfile(id);
    this.setState({
      name: profile.name,
    });
    let imageUrl;
    try {
      imageUrl = await getImageOnIpfs(profile.icon);
    } catch(err) {
      console.error(err);
      return;
    }
    this.setState({
      icon: imageUrl,
    });
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getProfile(id);
  }
  render() {
    return (
      <div className="user">
        <img src={this.state.icon} className="user-icon" />
        <h2 className="user-name">
          { this.state.name }
        </h2>
      </div>
    );
  }
}

export default UserComponent;
