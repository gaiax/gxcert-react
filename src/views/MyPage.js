import React from "react";
import { MyInfoComponent } from "./MyInfo";
import { MyCertListComponent } from "./CertList";

class MyPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
      address: props.address,
      certificates: props.certificates,
    }
  }
  render() {
    return (
      <div className="show">
        <MyInfoComponent address={this.state.address} />
        <MyCertListComponent certificates={this.state.certificates} isLoading={this.state.isLoading} />
      </div>
    );
  }
}

export {
  MyPageComponent,
}
