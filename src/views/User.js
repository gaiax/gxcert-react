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
          certificatesIIssued={this.props.certificatesIIssued}
          getInfoOfCertificates={this.props.getInfoOfCertificates}
          getInfoOfCertificatesIIssued={this.props.getInfoOfCertificatesIIssued}
          getCertificates={this.props.getCertificates}
          getCertificatesIIssued={this.props.getCertificatesIIssued}
          changeTabToIssuer={() => {
            return this.props.changeTabToIssuer(address);
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
