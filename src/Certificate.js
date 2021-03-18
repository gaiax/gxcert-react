import React from "react";
import CommunicationLoading from "./loading";
import * as ipfs from "./ipfs";
import "./Certificate.css";

function dateString(date) {
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}
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
      console.log(that.state.certificate);
      const imageUrl = await ipfs.getCertificateImage(that.state.certificate.ipfs);
      console.log(imageUrl);
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
              dateString(new Date(this.state.certificate.time))
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
        { this.state.certificates.map((certificate) => {
          return (
            <CertComponent certificate={certificate} />
          );
        })}
      </div>
    );
  }
}

class CertViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    this.state = {
      certificate: props.certificate,
    }
  }
  componentWillMount() {
    const that = this;
    (async () => {
      const certificates = await that.client.getCertificates(that.client.address);
      that.setState({
        isLoading: false,
        certificates: certificates,
      });
    })();
  }
  render() {
    return (
      <div className="certificate-view">
        <div className="certificate-view-top">
          <button className="back">＜</button>
          <img src={this.state.imageUrl} className="certificate-view-image" alt="GxCert" />
          <button className="next">＞</button>
        </div>
        <div className="certificate-view-bottom">
          <p className="certificate-view-issueser">
            { !this.state.certificate.issueserName ? this.state.certificate.by.substr(0, 16) : this.state.certificate.issueserName }
          </p>
          <p className="certificate-view-date">
            {
              dateString(new Date(this.state.certificate.time))
            }
          </p>
        </div>
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
      certificates: []
    }
  }
  componentWillMount() {
    const that = this;
    (async () => {
      const certificates = await that.client.getCertificates(that.client.address);
      that.setState({
        isLoading: false,
        certificates: certificates,
      });
    })();
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
  CertViewComponent,
}
