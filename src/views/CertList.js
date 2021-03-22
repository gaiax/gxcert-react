import React from "react";
import { CommunicationLoading } from "./components";
import "./Certificate.css";
import { Link } from "react-router-dom";
import { CertCellComponent } from "./CertCell";


class CertListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: props.certificates,
    }
  }
  render() {
    return (
      <div className="certificates">
        { this.state.certificates.map((certificate, index) => {
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
  constructor(props) {
    super(props);
    let certificates = [];
    if (props.certificates) {
      certificates = props.certificates;
    }
    this.state = {
      isLoading: props.isLoading,
      certificates: certificates,
    }
  }
  render() {
    return (
      <div className="mycertificates">
        <h2 className="mycertificates-title">My Certificates</h2>
        { this.state.isLoading ? <CommunicationLoading /> : <CertListComponent certificates={this.state.certificates} /> }
      </div>
    );
  }
}

export {
  CertListComponent,
  MyCertListComponent,
}
