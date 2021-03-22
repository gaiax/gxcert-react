import React from "react";
import "./Certificate.css";
import * as ipfs from "./ipfs";
import { dateString } from "./date";

class CertViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    const index = parseInt(props.match.params.index);
    this.index = index;
    this.state = {
      certificates: props.certificates,
      index: index,
    }
  }
  back() {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
      });
      this.loadImage();
    }
  }
  next() {
    if (this.state.index < this.state.certificates.length - 1) {
      this.setState({
        index: this.state.index + 1,
      });
      this.loadImage();
    }
  }
  async loadImage() {
    const certificate = this.state.certificates[this.state.index];
    const imageUrl = await ipfs.getCertificateImage(certificate.ipfs);
    console.log(imageUrl);
    this.setState({
      imageUrl
    });
  }
  componentWillMount() {
    this.loadImage();
  }
  render() {
    const certificate = this.state.certificates[this.state.index];
    return (
      <div className="cert-view">
        <div className="cert-view-top">
          <button className="back" onClick={this.back.bind(this)}>＜</button>
          <img src={this.state.imageUrl} className="cert-view-image" alt="GxCert" />
          <button className="next" onClick={this.next.bind(this)}>＞</button>
        </div>
        <div className="cert-view-bottom">
          <p className="cert-view-issueser">
            { !certificate.issueserName ? certificate.by.substr(0, 16) : certificate.issueserName }
          </p>
          <p className="cert-view-date">
            {
              dateString(new Date(certificate.time * 1000))
            }
          </p>
        </div>
      </div>
    );
  }
}

export {
  CertViewComponent
}
