import React from "react";
import { MyInfoComponent } from "./MyInfo";
import { MyCertListComponent } from "./Certificate";

class ShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    this.state = {
      address: props.address,
      certificates: [],
    }
  }
  render() {
    return (
      <div className="show">
        <MyInfoComponent address={this.state.address} />
        <MyCertListComponent certificates={this.state.certificates} client={this.client} />
      </div>
    );
  }
}

export {
  ShowComponent,
}
