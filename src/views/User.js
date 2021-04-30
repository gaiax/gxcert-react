import React from "react";
import { getImageOnIpfs } from "../image-upload";
import "./User.css";
import { MyCertListComponent } from "./CertList";
import NotFoundComponent from "./404";

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const address = this.props.match.params.id;
    this.props.fetchProfile(address);
    this.props.getCertificates(address);
  }
  render() {
    if (this.props.isNotFound) {
      return (
        <NotFoundComponent />
      );
    }
    console.log(this.props);
    const address = this.props.match.params.id;
    let imageUrl = null;
    if (this.props.profile) {
      imageUrl = this.props.profile.imageUrl;
    }
    return (
      <div className="user">
        <img src={imageUrl} className="user-icon" />
        <h2 className="user-name">
          { this.props.nameInIpfs }
        </h2>
        <MyCertListComponent
          isLoading={this.props.isLoading}
          certificates={this.props.certificates}
          certificatesIIssuesed={this.props.certificatesIIssuesed}
          getInfoOfCertificates={this.props.getInfoOfCertificates}
          getInfoOfCertificatesIIssuesed={this.props.getInfoOfCertificatesIIssuesed}
          getCertificates={this.props.getCertificates}
          getCertificatesIIssuesed={this.props.getCertificatesIIssuesed}
          changeTabToIssueser={() => {
            return this.props.changeTabToIssueser(address);
          }}
          changeTabToMyCertificates={this.props.changeTabToMyCertificates}
          tab={this.props.tab}
          path={"users/" + address + "/"}
        />
      </div>
    );
  }
}

export default UserComponent;
