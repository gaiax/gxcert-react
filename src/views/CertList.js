import React from "react";
import { CommunicationLoading } from "./components";
import "./Certificate.css";
import { Link } from "react-router-dom";
import { CertCellComponent } from "./CertCell";


class CertListComponent extends React.Component {
  render() {
    return (
      <div className="certificates">
        { this.props.certificates.map((certificate, index) => {
          return (
            <Link to={"/certs/" + index}>
              <CertCellComponent certificate={certificate} />
            </Link>
          );
        })}
      </div>
    );
  }
}


class MyCertListComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      isLoading: nextProps.isLoading,
      certificates: nextProps.certificates,
    }
  }
  render() {
    return (
      <div className="mycertificates">
        <h2 className="mycertificates-title">My Certificates</h2>
        { this.props.isLoading ? <CommunicationLoading /> : <CertListComponent certificates={this.props.certificates} /> }
      </div>
    );
  }
}

export {
  CertListComponent,
  MyCertListComponent,
}
