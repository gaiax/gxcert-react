import React from "react";
import { MyInfoComponent } from "./MyInfo";
import { MyCertListComponent } from "./CertList";

class MyPageComponent extends React.Component {
  componentDidMount() {
    if (this.props.certificates.length === 0) {
      this.props.getCertificates();
    }
  }
  render() {
    return (
      <div className="show">
        <MyInfoComponent 
          address={this.props.address} 
          profile={this.props.profile}
          exportAccount={this.props.exportAccount} 
          onCopyId={this.props.onCopyId}
          logout={this.props.logout}
          openExportModal={this.props.openExportModal}
        />
        <MyCertListComponent 
          certificates={this.props.certificates}
          certificatesIIssued={this.props.certificatesIIssued}
          isLoading={this.props.isLoading} 
          getCertificates={this.props.getCertificates}
          getCertificatesIIssued={this.props.getCertificatesIIssued}
          changeTabToIssuer={this.props.changeTabToIssuer}
          changeTabToMyCertificates={this.props.changeTabToMyCertificates}
          tab={this.props.tab}
          getInfoOfCertificates={this.props.getInfoOfCertificates}
          getInfoOfCertificatesIIssued={this.props.getInfoOfCertificatesIIssued}
        />
      </div>
    );
  }
}

export {
  MyPageComponent,
}
