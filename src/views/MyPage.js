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
      icon: props.icon,
    }
  }
  componentDidMount() {
    this.props.getCertificates();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      address: prevState.address,
      certificates: nextProps.certificates,
      isLoading: nextProps.isLoading,
      icon: nextProps.icon,
    }
  }
  render() {
    return (
      <div className="show">
        <MyInfoComponent address={this.props.address} icon={this.props.icon} />
        <MyCertListComponent certificates={this.props.certificates} isLoading={this.props.isLoading} />
      </div>
    );
  }
}

export {
  MyPageComponent,
}
