import React from "react";
import * as ipfs from "./ipfs";
import "./certificate.css";

class CertificateComponent extends React.Component {
  componentWillMount() {
    const that = this;
    (async () => {
      try {
        const imageUrl = await ipfs.getCertificateImage(that.state.ipfs_hash);
        that.setState({ imageUrl });
      } catch(err) {
        console.error(err);
        return;
      }
    })();
  }
  constructor(props) {
    super(props);
    this.state = {
      ipfs_hash: props.ipfs_hash,
      imageUrl: null,
      issueser: props.issueser,
      receiver: props.receiver,
    }
  }
  render() {
    return (
      <div class="certificate">
        <img src={ this.state.imageUrl } width="200" alt="certificate" />
        <p>issueser: { this.state.issueser }</p>
        <p>receiver: { this.state.receiver }</p>
      </div>
    )
  }
}
class CertificateComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: props.certificates,
    }
  }
  render() {
    return (
      <div class="certificates">
        { this.state.certificates.map((certificate) => {
          return (
            <CertificateComponent ipfs_hash={certificate.ipfs_hash} issueser={certificate.issueser} receiver={certificate.receiver} />
          );
        }) }
      </div>
    );
  }
}

export {
  CertificateComponents,
  CertificateComponent
}

