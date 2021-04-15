import React from "react";
import { getImageOnIpfs } from "../image-upload";
import "./User.css";
import { MyCertListComponent } from "./CertList";

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
    console.log(this.props);
    const address = this.props.match.params.id;
    return (
      <div className="user">
        <img src={this.props.imageUrl} className="user-icon" />
        <h2 className="user-name">
          { this.props.name }
        </h2>
        <MyCertListComponent
          isLoading={this.props.isLoading}
          certificates={this.props.certificates}
          certificatesIIssuesed={this.props.certificatesIIssuesed}
          getInfoOfCertificates={this.props.getInfoOfCertificates}
          getInfoOfCertificatesIIssuesed={this.props.getInfoOfCertificatesIIssuesed}
          getCertificates={this.props.getCertificates}
          changeTabToIssueser={() => {
            return this.props.changeTabToIssueser(address);
          }}
          changeTabToMyCertificates={this.props.changeTabToMyCertificates}
          tab={this.props.tab}
        />
      </div>
    );
  }
}

export default UserComponent;
