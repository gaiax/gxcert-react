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
          isLoading={this.props.isLoading} 
          path={this.props.path} 
          getCertificates={this.props.getCertificates}
        />
      </div>
    );
  }
}

export {
  MyPageComponent,
}
