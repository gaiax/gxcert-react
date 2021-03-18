import React from "react";
import CommunicationLoading from "./loading";

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
    }
  }
  render() {
    return (
      <div className="cert-cell">
        <img src={this.certificate.imageUrl} width="200" alt="certificate" />
        <div className="cert-cell-info">
          <p className="cert-cell-issueser">
            { this.certificate.issueserName }
          </p>
          <p className="cert-cell-date">
            {
              dateString(new Date(this.state.certificate.created_at))
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

class MyCertListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    this.state = {
      isLoading: true,
      certificates: []
    }
  }
  componentDidMount() {
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
}
