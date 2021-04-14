import React from "react";
import { CommunicationLoading } from "./components";
import "./Certificate.css";
import { Link } from "react-router-dom";
import { CertCellComponent } from "./CertCell";


class CertListComponent extends React.Component {
  componentDidMount() {
    this.props.getInfoOfCertificates();
  }
  render() {
    return (
      <div className="certificates">
        { this.props.certificates.length === 0 ? <p className="certificate-not-found">There are no certificates.</p> : "" }
        { this.props.certificates.map((certificate, index) => {
          return (
            <Link to={"/" + this.props.path + "/" + index}>
              <CertCellComponent certificate={certificate} />
            </Link>
          );
        })}
      </div>
    );
  }
}


class MyCertListComponent extends React.Component {
  render() {
    return (
      <div className="mycertificates">
        <h2 className="mycertificates-title"><a href="javascript:void(0)" onClick={this.props.changeTabToMyCertificates}> My Certificates</a><span onClick={this.props.getCertificates}>🔃</span> <a href="javascript:void(0)" onClick={this.props.changeTabToIssueser} >Certificates I issuesed</a></h2>
        { this.props.isLoading ? <CommunicationLoading /> : "" }
        { !this.props.isLoading && this.props.tab === 0 ? <CertListComponent
          certificates={this.props.certificates}
          path={"certs"}
          getInfoOfCertificates={this.props.getInfoOfCertificates}
        /> : "" }
        { !this.props.isLoading && this.props.tab === 1 ? <CertListComponent
          certificates={this.props.certificatesIIssuesed}
          getInfoOfCertificates={this.props.getInfoOfCertificates}
          path={"issuesed"}
        /> : "" }
      </div>
    );
  }
}

export {
  CertListComponent,
  MyCertListComponent,
}
