import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from 'redux-persist/integration/react'
import { 
  loginWithGoogle, 
  logout, 
  getInfoOfCertificatesIIssued, 
  getInfoOfCertificatesIIssuedInUserPage, 
  getInfoOfCertificates, 
  getInfoOfCertificatesInUserPage, 
  getCertificatesInUserPage, 
  getCertificatesIIssuedInUserPage, 
  changeTabInUserPageToIssuer, 
  changeTabInUserPageToMyCertificates, 
  fetchProfileInUserPage, 
  changeTabToIssuer, 
  changeTabToMyCertificates, 
  onCopyId, 
  exportFile, 
  closeModal, 
  getMyProfile, 
  getCertificates, 
  getCertificatesIIssued, 
  issue, 
  onChangeIssueTo, 
  onChangeCertificateImage, 
  onChangeName, 
  onChangeIcon, 
  onChangeDescription,
  updateUserSetting, 
  onChangeTitle,
  openExportModal,
  closeExportModal,
  copyAccount,
} from "./actions";
import { connect, Provider } from "react-redux";
import store, { persistor } from "./store";
import { withRouter, HashRouter as Router } from "react-router-dom";
import CertClient from "./client"

function mapStateToProps(state, props) {
  return state;
}

function mapDispatchToProps(dispatch, props) {
  return {
    getCertificates: () => {
      dispatch(getCertificates());
    },
    getCertificatesIIssued: () => {
      dispatch(getCertificatesIIssued());
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
    getMyProfile: () => {
      dispatch(getMyProfile());
    },
    onChangeName: (evt) => {
      dispatch(onChangeName(evt));
    },
    onChangeIcon: (evt) => {
      dispatch(onChangeIcon(evt));
    },
    onChangeTitle: (evt) => {
      dispatch(onChangeTitle(evt));
    },
    onChangeDescription: (evt) => {
      dispatch(onChangeDescription(evt));
    },
    updateUserSetting: () => {
      dispatch(updateUserSetting());
    },
    exportFile: (evt) => {
      dispatch(exportFile(evt));
    },
    openExportModal: () => {
      dispatch(openExportModal());
    },
    closeModal: () => {
      dispatch(closeModal());
    },
    onCopyId: () => {
      dispatch(onCopyId());
    },
    getCertificatesInUserPage: (address) => {
      dispatch(getCertificatesInUserPage(address));
    },
    getCertificatesIIssuedInUserPage: (address) => {
      dispatch(getCertificatesIIssuedInUserPage(address));
    },
    changeTabToIssuer: () => {
      dispatch(getCertificatesIIssued());
    },
    changeTabToMyCertificates: () => {
      dispatch(getCertificates());
    },
    changeTabInUserPageToIssuer: (address) => {
      dispatch(getCertificatesIIssuedInUserPage(address));
    },
    changeTabInUserPageToMyCertificates: () => {
      dispatch(changeTabInUserPageToMyCertificates());
    },
    fetchProfileInUserPage: (address) => {
      dispatch(fetchProfileInUserPage(address));
    },
    getInfoOfCertificates: () => {
      dispatch(getInfoOfCertificates());
    },
    getInfoOfCertificatesIIssued: () => {
      dispatch(getInfoOfCertificatesIIssued());
    },
    getInfoOfCertificatesIIssuedInUserPage: () => {
      dispatch(getInfoOfCertificatesIIssuedInUserPage());
    },
    getInfoOfCertificatesInUserPage: () => {
      dispatch(getInfoOfCertificatesInUserPage());
    },
    logout: () => {
      dispatch(logout());
    },
    loginWithGoogle: () => {
      dispatch(loginWithGoogle());
    },
    closeExportModal: () => {
      dispatch(closeExportModal());
    },
    copyAccount: () => {
      dispatch(copyAccount());
    }
  }
}

const RxApp = connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <RxApp />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
