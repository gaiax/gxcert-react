import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { logout, getImagesIIssuesed, getImagesIIssuesedInUserPage, getImages, getImagesInUserPage, getCertificatesInUserPage, getCertificatesIIssuesedInUserPage, changeTabInUserPageToIssueser, changeTabInUserPageToMyCertificates, fetchProfileInUserPage, changeTabToIssueser, changeTabToMyCertificates, onCopyId, exportAccount, closeModal, getMyProfile, getCertificates, getCertificatesIIssuesed, issue, onChangeIssueTo, onChangeCertificateImage, onChangeName, onChangeIcon, updateUserSetting, onChangeTitle } from "./actions";
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
    getCertificatesIIssuesed: () => {
      dispatch(getCertificatesIIssuesed());
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
    updateUserSetting: () => {
      dispatch(updateUserSetting());
    },
    exportAccount: (evt) => {
      dispatch(exportAccount(evt));
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
    changeTabToIssueser: () => {
      dispatch(getCertificatesIIssuesed());
    },
    changeTabToMyCertificates: () => {
      dispatch(getCertificates());
    },
    changeTabInUserPageToIssueser: (address) => {
      dispatch(getCertificatesIIssuesedInUserPage(address));
    },
    changeTabInUserPageToMyCertificates: () => {
      dispatch(changeTabInUserPageToMyCertificates());
    },
    fetchProfileInUserPage: (address) => {
      dispatch(fetchProfileInUserPage(address));
    },
    getImages: () => {
      dispatch(getImages());
    },
    getImagesIIssuesed: () => {
      dispatch(getImagesIIssuesed());
    },
    getImagesIIssuesedInUserPage: () => {
      dispatch(getImagesIIssuesedInUserPage());
    },
    getImagesInUserPage: () => {
      dispatch(getImagesInUserPage());
    },
    logout: () => {
      dispatch(logout());
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
