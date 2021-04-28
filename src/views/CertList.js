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
    let path = "";
    if (this.props.path) {
      path = this.props.path;
    }
    return (
      <div className="mycertificates">
        <h2 className="mycertificates-title"><a href="javascript:void(0)" onClick={this.props.changeTabToMyCertificates} className="mycertificates-tab"> My Certificates</a><a href="javascript:void(0)" onClick={this.props.changeTabToIssueser} className="mycertificates-tab" >Certificates I issuesed</a></h2>
        { this.props.isLoading ? <CommunicationLoading /> : "" }
        { !this.props.isLoading && this.props.tab === 0 ? <CertListComponent
          certificates={this.props.certificates}
          path={path + "certs"}
          getInfoOfCertificates={this.props.getInfoOfCertificates}
        /> : "" }
        { !this.props.isLoading && this.props.tab === 1 ? <CertListComponent
          certificates={this.props.certificatesIIssuesed}
          getInfoOfCertificates={this.props.getInfoOfCertificatesIIssuesed}
          path={path + "issuesed"}
        /> : "" }
      </div>
    );
  }
}

export {
  CertListComponent,
  MyCertListComponent,
}
