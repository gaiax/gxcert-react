import React from "react";
import "./Login.css";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <img src="/google.png" className="login-google" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default Login;
