import "./App.css";
import React from "react";
import { getGoogleUid } from "./util";
import CertClient, {clientWithoutAccount} from "./client";
import Login from "./views/Login";
import { IssueComponent } from "./views/Issue";
import { SettingComponent } from "./views/Setting";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { MyPageComponent } from "./views/MyPage";
import { CertViewComponent } from "./views/CertView";
import UserComponent from "./views/User";
import BsModal from "./views/components/BsModal";
import BsExportModal from "./views/components/BsExportModal";
import BsIssueModal from "./views/components/BsIssueModal";
import ModalType from "./modalType";


const UI = {
  byId: function(id) {
    return document.getElementById(id);
  },
  showErrorMessage: function(message) {
    console.error(message);
  },
  showMessage: function(message) {
    console.log(message);
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.myPageRef = React.createRef();
    this.state = {
      myPageIsLoading: true,
      issuePageIsLoading: false,
      certificates: [],
      message: null,
    }
  }
  closeModal() {
    this.setState({
      issuePageIsLoading: false,
      message: null,
    });
  }
  render() {
    const that = this;
    console.log(that.props);
    let normalModal = "";
    const profile = this.props.state.myProfile;
    const client = this.props.state.client;
    let name = "";
    if (client !== null && client.profile !== null) {
      name = client.profile.nameInIpfs;
    }
    let icon = "";
    if (profile) {
      icon = profile.icon;
    }
    const login = (
      <Login onClick={this.props.loginWithGoogle} />
    );
    let modal = "";
    if (this.props.state.modal === ModalType.EXPORT) {
      modal = (
        <BsExportModal
          seed={this.props.state.client.uid}
          exportFile={this.props.exportFile} 
          copyAccount={this.props.copyAccount}
          closeExportModal={this.props.closeExportModal}
        />
      );
    } else if (this.props.state.modal === ModalType.NORMAL) {
      modal = (
        <BsModal show={true} closeModal={this.props.closeModal} isLoading={this.props.state.isLoading} message={this.props.state.message} errorMessage={this.props.state.errorMessage}/>
      );
    } else if (this.props.state.modal === ModalType.ISSUE) {
      modal = (
        <BsIssueModal show={true} closeModal={this.props.closeModal} />
      );
    }
    const main = (
        <div className="main">
          <header>
          <h2 className="brand-logo"><a href="/">GxCert</a></h2>
          <Link to="/issue" className="header-issue-button header-button">Issue</Link>
          <Link to="/" className="header-show-button header-button">{client !== null && client.profile && client.profile.nameInIpfs ? client.profile.nameInIpfs.substr(0, 6) + "..." : "Profile" }</Link>
          </header>
          <div className="main">
            <Switch>
              <Route exact path="/" render={ () => <MyPageComponent 
                address={client.address} 
                profile={client.profile}
                isLoading={that.props.state.myPageIsLoading} 
                certificates={that.props.state.certificates} 
                certificatesIIssuesed={that.props.state.certificatesIIssuesed}
                getCertificates={that.props.getCertificates} 
                getCertificatesIIssuesed={that.props.getCertificatesIIssuesed} 
                openExportModal={that.props.openExportModal}
                onCopyId={that.props.onCopyId}
                getInfoOfCertificates={that.props.getInfoOfCertificates}
                getInfoOfCertificatesIIssuesed={that.props.getInfoOfCertificatesIIssuesed}
                changeTabToIssueser={that.props.changeTabToIssueser}
                changeTabToMyCertificates={that.props.changeTabToMyCertificates}
                tab={that.props.state.tabInMyPage}
                logout={that.props.logout}
              /> } />
              <Route exact path="/issue" render={ () => <IssueComponent 
                onClickIssueButton={this.props.issue} 
                onChangeCertificateImage={this.props.onChangeCertificateImage} 
                onChangeIssueTo={this.props.onChangeIssueTo} 
                onChangeTitle={this.props.onChangeTitle}
                onChangeDescription={this.props.onChangeDescription}
              /> } />
              <Route exact path="/user" render={ () => <SettingComponent 
                onClickUpdateButton={this.props.updateUserSetting} 
                onChangeName={this.props.onChangeName} 
                onChangeIcon={this.props.onChangeIcon} 
                name={name}
              /> } />
              <Route exact path="/users/:id" render={ (routeProps) => <UserComponent
                { ...routeProps }
                profile={that.props.state.profileInUserPage}
                fetchProfile={that.props.fetchProfileInUserPage}
                imageUrl={that.props.state.iconInUserPage}
                name={that.props.state.nameInUserPage}
                isLoading={that.props.state.userPageIsLoading}
                certificates={that.props.state.certificatesInUserPage}
                certificatesIIssuesed={that.props.state.certificatesIIssuesedInUserPage}
                getCertificates={that.props.getCertificatesInUserPage}
                getCertificatesIIssuesed={that.props.getCertificatesIIssuesedInUserPage}
                getInfoOfCertificates={that.props.getInfoOfCertificatesInUserPage}
                getInfoOfCertificatesIIssuesed={that.props.getInfoOfCertificatesIIssuesedInUserPage}
                changeTabToIssueser={that.props.changeTabInUserPageToIssueser}
                changeTabToMyCertificates={that.props.changeTabInUserPageToMyCertificates}
                tab={that.props.state.tabInUserPage}
                isNotFound={that.props.state.userIsNotFound}
              /> } />
              <Route exact path="/users/:address/issuesed/:index" render={ (routeProps) => <CertViewComponent {...routeProps} 
                certificates={that.props.state.certificatesIIssuesedInUserPage}
                client={clientWithoutAccount}
                getCertificates={that.props.getCertificatesInUserPage}
                fromUserPage={true}
              /> } />
              <Route exact path="/users/:address/certs/:index" render={ (routeProps) => <CertViewComponent {...routeProps} 
                certificates={that.props.state.certificatesInUserPage}
                client={clientWithoutAccount}
                getCertificatesIIssuesed={that.props.getCertificatesIIssuesedInUserPage}
                fromUserPage={true}
              /> } />
              <Route exact path="/issuesed/:index" render={ (routeProps) => <CertViewComponent {...routeProps}
                certificates={that.props.state.certificatesIIssuesed}
                client={clientWithoutAccount}
              />} />
              <Route exact path="/certs/:index" render={ (routeProps) => <CertViewComponent {...routeProps} 
                certificates={that.props.state.certificates} 
                client={clientWithoutAccount}
              />} />
            </Switch>
          </div>
          { modal }
        </div>
    );
    return (
        <div className="App">
          { !this.props.location.pathname.startsWith("/users/") && client === null ? login : main }
          <BsModal show={true} closeModal={this.props.closeModal} isLoading={this.props.state.isLoading} message={this.props.state.message} errorMessage={this.props.state.errorMessage}/>
        </div>
    );
  }
}

export default withRouter(App);
