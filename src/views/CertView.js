import React from "react";
import "./Certificate.css";
import { getTextOnIpfs, getImageOnIpfs } from "../image-upload";
import { dateString } from "../util";
import { Link } from "react-router-dom";
import NotFoundComponent from "./404";

class CertViewComponent extends React.Component {
  constructor(props) {
    super(props);
    const index = parseInt(props.match.params.index);
    let address = props.client.address;
    if (props.fromUserPage) {
      address = props.match.params.address;
    }
    this.index = index;
    this.state = {
      address,
      index: index,
      verified: null,
    }
  }
  back() {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
        verified: null,
      });
    }
  }
  next() {
    if (this.state.index < this.props.certificates.length - 1) {
      this.setState({
        index: this.state.index + 1,
        verified: null,
      });
    }
  }
  componentDidMount() {
    const index = parseInt(this.props.match.params.index);
    this.setState({
      index,
    });
    const certificate = this.props.certificates[this.state.index];
    if (this.props.fromUserPage) {
      if (this.props.getCertificates) {
        this.props.getCertificates(this.state.address);
      }
      if (this.props.getCertificatesIIssued) {
        this.props.getCertificatesIIssued(this.state.address);
      }
    }
  }
  async verifyCertificate() {
    const client = this.props.client;
    const certificate = this.props.certificates[this.state.index];
    let verified;
    if (this.props.fromUserPage) {
      verified = client.verifyCertificate(certificate, client.address);
    } else {
      verified = client.verifyCertificate(certificate, this.state.address);
    }
    this.setState({
      verified: verified,
    });
  }
  render() {
    if (this.state.index < 0 || this.props.certificates.length <= this.state.index) {
      return (
        <NotFoundComponent />
      );
    }
    const certificate = this.props.certificates[this.state.index];
    return (
      <div className="cert-view">
        <div className="cert-view-top">
          <button className="back" onClick={this.back.bind(this)}>＜</button>
          <img src={certificate.imageUrl} className="cert-view-image" alt="GxCert" />
          <button className="next" onClick={this.next.bind(this)}>＞</button>
        </div>
        <div className="cert-view-bottom">
          <button onClick={this.verifyCertificate.bind(this)} className="verify-button">Verify</button>
          <p className="cert-view-title">
            { this.state.verified ? "✅ This certificate is valid." : "" }
            { !this.state.verified && this.state.verified !== null ? "❌ This certificate is invalid." : "" }<br/>
            title: { certificate.titleInIpfs }<br/>
            Issuer: <Link to={"/users/" + certificate.by } className="issuer">{ !certificate.issuerName ? certificate.by.substr(0, 16) : certificate.issuerName }</Link> <br/>
            Holder: { !certificate.to ? "" : "to " + certificate.to.substr(0, 16) } at {
              dateString(new Date(certificate.time * 1000))
            }
          </p>
          <p className="cert-view-description">
            description: <br/>
            { certificate.descriptionInIpfs }
          </p>
        </div>
      </div>
    );
  }
}

export {
  CertViewComponent
}
