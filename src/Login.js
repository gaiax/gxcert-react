import React from "react";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: props.onClick,
    }
  }
  render() {
    return (
      <div className="login-page">
        <button className="login-google" onClick={this.state.onClick}>
          Login Google
        </button>
      </div>
    );
  }
}

export default Login;
