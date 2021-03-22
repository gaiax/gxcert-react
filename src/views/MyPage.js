import React from "react";
import { MyInfoComponent } from "./MyInfo";
import { MyCertListComponent } from "./Certificate";

class MyPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    this.onLoad = props.onLoad;
    this.state = {
      address: props.address,
      certificates: [],
    }
  }
  render() {
    return (
      <div className="show">
        <MyInfoComponent address={this.state.address} />
        <MyCertListComponent certificates={this.state.certificates} client={this.client} onLoad={this.onLoad} />
      </div>
    );
  }
}

export {
  MyPageComponent,
}
