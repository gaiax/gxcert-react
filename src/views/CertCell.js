import React from "react";
import "./Certificate.css";
import { dateString } from "../util";
import { getImageOnIpfs } from "../image-upload";

function displayedTitle(title) {
  if (!title) {
    return "";
  }
  if (title.length > 16) {
    return title.substr(0, 16) + "...";
  }
  return title;
}
class CertCellComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className="cert-cell">
        <img src={!this.props.certificate.imageUrl ? "" : this.props.certificate.imageUrl} className="cert-cell-image" alt="certificate" />
        <div className="cert-cell-info">
          <p className="cert-cell-title">
            { displayedTitle(this.props.certificate.titleInIpfs) }
          </p>
          <p className="cert-cell-issuer">
            { this.props.certificate.byProfile ? "by " + this.props.certificate.byProfile.name.substr(0, 16) : "" } { this.props.certificate.toProfile ? "to " + this.props.certificate.toProfile.name.substr(0, 16) : "" }
          </p>
          <p className="cert-cell-date">
            at {
              dateString(new Date(this.props.certificate.time * 1000))
            }
          </p>
        </div>
      </div>
    );
  }
}

export {
  CertCellComponent
};
