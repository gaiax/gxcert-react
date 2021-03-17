import React from "react";

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

class ListComponent extends React.Component {
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
