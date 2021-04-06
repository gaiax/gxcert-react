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
          icon={this.props.icon} 
          exportAccount={this.props.exportAccount} 
          onCopyId={this.props.onCopyId}
        />
        <MyCertListComponent 
          certificates={this.props.certificates}
          certificatesIIssuesed={this.props.certificatesIIssuesed}
          isLoading={this.props.isLoading} 
          path={this.props.path} 
          getCertificates={this.props.getCertificates}
          changeTabToIssueser={this.props.changeTabToIssueser}
          changeTabToMyCertificates={this.props.changeTabToMyCertificates}
          tab={this.props.tab}
        />
      </div>
    );
  }
}

export {
  MyPageComponent,
}
