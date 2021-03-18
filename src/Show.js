import React from "react";
import { MyInfoComponent } from "./MyInfo";
import { CertListComponent } from "./Certificate";

class ShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      certificates: [],
    }
  }
  render() {
    return (
      <div className="show">
        <MyInfoComponent address={this.state.address} />
        <CertListComponent certificates={this.state.certificates} />
      </div>
    );
  }
}

export {
  ShowComponent,
}
