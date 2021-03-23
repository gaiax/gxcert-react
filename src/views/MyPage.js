import React from "react";
import { MyInfoComponent } from "./MyInfo";
import { MyCertListComponent } from "./CertList";

class MyPageComponent extends React.Component {
  constructor(props) {
    super(props);
    let certificates = [];
    if (props.certificates) {
      certificates = props.certificates;
    }
    this.state = {
      address: props.address,
      certificates: certificates,
      isLoading: props.isLoading,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      address: prevState.address,
      certificates: nextProps.certificates,
      isLoading: nextProps.isLoading,
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
