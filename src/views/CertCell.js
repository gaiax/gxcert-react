import React from "react";
import "./Certificate.css";
import { dateString } from "../util";
import { getCertificateImage } from "../image-upload";

class CertCellComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
    }
  }
  componentWillMount() {
    const that = this;
    (async () => {
      const imageUrl = await getCertificateImage(that.props.certificate.ipfs);
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
            { !this.props.certificate.issueserName ? this.props.certificate.by.substr(0, 16) : this.props.certificate.issueserName }
          </p>
          <p className="cert-cell-date">
            {
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
