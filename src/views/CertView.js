import React from "react";
import "./Certificate.css";
import { getTextOnIpfs, getImageOnIpfs } from "../image-upload";
import { dateString } from "../util";
import { Link } from "react-router-dom";

class CertViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    const index = parseInt(props.match.params.index);
    this.index = index;
    this.state = {
      certificates: props.certificates,
      index: index,
      verified: null,
      title: "",
      imageUrl: "",
    }
  }
  back() {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
        verified: null,
      });
      this.loadDetail();
    }
  }
  next() {
    if (this.state.index < this.state.certificates.length - 1) {
      this.setState({
        index: this.state.index + 1,
        verified: null,
      });
      this.loadDetail();
    }
  }
  loadDetail() {
    this.loadImage();
    this.loadTitle();
    this.loadDescription();
  }
  async loadImage() {
    const certificate = this.state.certificates[this.state.index];
    if (certificate.imageUrl) {
      this.setState({
        imageUrl: certificate.imageUrl
      });
      return;
    }
    let imageUrl;
    try {
      imageUrl = await getImageOnIpfs(certificate.ipfs);
    } catch(err) {
      console.error(err);
      return;
    }
    this.setState({
      imageUrl
    });
  }
  async loadTitle() {
    const certificate = this.state.certificates[this.state.index];
    if (certificate.titleInIpfs) {
      this.setState({
        titleInIpfs: certificate.titleInIpfs
      });
      return;
    }
    let title;
    try {
      title = await getTextOnIpfs(certificate.title);
    } catch(err) {
      console.error(err);
      this.setState({
        titleInIpfs: "",
      });
      return;
    }
    this.setState({
      titleInIpfs: title,
    });
  }
  async loadDescription() {
    const certificate = this.state.certificates[this.state.index];
    if (certificate.descriptionInIpfs) {
      this.setState({
        descriptionInIpfs: certificate.descriptionInIpfs,
      });
      return;
    }
    let description;
    try {
      description = await getTextOnIpfs(certificate.description);
    } catch(err) {
      console.error(err);
      this.setState({
        descriptionInIpfs: "",
      });
      return;
    }
    this.setState({
      descriptionInIpfs: description,
    });
  }
  async verifyCertificate() {
    const client = this.props.client;
    const certificate = this.state.certificates[this.state.index];
    const verified = client.verifyCertificate(certificate, client.address);
    this.setState({
      verified: verified,
    });
  }
  componentDidMount() {
    this.loadDetail();
  }
  render() {
    const certificate = this.props.certificates[this.state.index];
    return (
      <div className="cert-view">
        <div className="cert-view-top">
          <button className="back" onClick={this.back.bind(this)}>＜</button>
          <img src={this.state.imageUrl} className="cert-view-image" alt="GxCert" />
          <button className="next" onClick={this.next.bind(this)}>＞</button>
        </div>
        <div className="cert-view-bottom">
          <button onClick={this.verifyCertificate.bind(this)} className="verify-button">Verify</button>
          <p className="cert-view-title">
            { this.state.verified ? "✅ This certificate is valid." : "" }
            { !this.state.verified && this.state.verified !== null ? "❌ This certificate is invalid." : "" }<br/>
            { this.state.titleInIpfs }<br/>
            by <Link to={"/users/" + certificate.by }>{ !certificate.issueserName ? certificate.by.substr(0, 16) : certificate.issueserName }</Link> { !certificate.to ? "" : "to " + certificate.to.substr(0, 16) } at {
              dateString(new Date(certificate.time * 1000))
            }
          </p>
          <p className="cert-view-description">
            { this.state.descriptionInIpfs }
          </p>
        </div>
      </div>
    );
  }
}

export {
  CertViewComponent
}
