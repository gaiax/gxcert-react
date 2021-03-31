import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CertClient from "./client";
import { getCertificates, issue, onChangeIssueTo, onChangeCertificateImage } from "./actions";
import { connect, Provider } from "react-redux";
import store from "./store";

function mapStateToProps(state, props) {
  return state;
}

function mapDispatchToProps(dispatch, props) {
  return {
    getCertificates: () => {
      dispatch(getCertificates());
    },
    issue: () => {
      dispatch(issue());
    },
    onChangeIssueTo: (evt) => {
      dispatch(onChangeIssueTo(evt));
    },
    onChangeCertificateImage: (evt) => {
      dispatch(onChangeCertificateImage(evt));
    },
  }
}

const RxApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <RxApp />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
