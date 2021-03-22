import React from "react";
import CommunicationLoading from "./loading";
import * as ipfs from "./ipfs";
import "./Certificate.css";
import { Link } from "react-router-dom";

import { dateString } from "./date";
class CertComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certificate: props.certificate,
      imageUrl: "",
    }
  }
  componentWillMount() {
    const that = this;
    (async () => {
      const imageUrl = await ipfs.getCertificateImage(that.state.certificate.ipfs);
      that.setState({
        imageUrl
      });
    })();
  }
  render() {
    return (
      <div className="cert-cell">
        <img src={this.state.imageUrl} className="cert-cell-image" alt="certificate" />
        <div className="cert-cell-info">
          <p className="cert-cell-issueser">
            { !this.state.certificate.issueserName ? this.state.certificate.by.substr(0, 16) : this.state.certificate.issueserName }
          </p>
          <p className="cert-cell-date">
            {
              dateString(new Date(this.state.certificate.time * 1000))
            }
          </p>
        </div>
      </div>
    );
  }
}

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
              <CertComponent certificate={certificate} />
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
    this.client = props.client;
    this.state = {
      isLoading: true,
      certificates: props.certificates,
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
  CertComponent,
  CertListComponent,
  MyCertListComponent,
}
