import React from "react";
import "./Login.css";

class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <button className="login-google" onClick={this.props.onClick}>
          Login with Google
        </button>
      </div>
    );
  }
}

export default Login;
