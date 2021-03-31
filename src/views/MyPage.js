import React from "react";
import { MyInfoComponent } from "./MyInfo";
import { MyCertListComponent } from "./CertList";

class MyPageComponent extends React.Component {
  componentDidMount() {
    this.props.getCertificates();
  }
  render() {
    return (
      <div className="show">
        <MyInfoComponent address={this.props.address} icon={this.props.icon} exportAccount={this.props.exportAccount} />
        <MyCertListComponent certificates={this.props.certificates} isLoading={this.props.isLoading} />
      </div>
    );
  }
}

export {
  MyPageComponent,
}
