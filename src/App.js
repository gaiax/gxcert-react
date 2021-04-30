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
          closeModal={this.props.closeModal}
        />
      );
    } else if (this.props.state.modal === ModalType.NORMAL) {
      modal = (
        <BsModal show={true} closeModal={this.props.closeModal} isLoading={this.props.state.isLoading} message={this.props.state.message} errorMessage={this.props.state.errorMessage}/>
      );
    } else if (this.props.state.modal === ModalType.ISSUE) {
      modal = (
        <BsIssueModal show={true} closeModal={this.props.closeModal} isLoading={this.props.state.isIssuing} error={this.props.state.issueError}/>
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
                certificatesIIssued={that.props.state.certificatesIIssued}
                getCertificates={that.props.getCertificates} 
                getCertificatesIIssued={that.props.getCertificatesIIssued} 
                openExportModal={that.props.openExportModal}
                onCopyId={that.props.onCopyId}
                getInfoOfCertificates={that.props.getInfoOfCertificates}
                getInfoOfCertificatesIIssued={that.props.getInfoOfCertificatesIIssued}
                changeTabToIssuer={that.props.changeTabToIssuer}
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
                certificatesIIssued={that.props.state.certificatesIIssuedInUserPage}
                getCertificates={that.props.getCertificatesInUserPage}
                getCertificatesIIssued={that.props.getCertificatesIIssuedInUserPage}
                getInfoOfCertificates={that.props.getInfoOfCertificatesInUserPage}
                getInfoOfCertificatesIIssued={that.props.getInfoOfCertificatesIIssuedInUserPage}
                changeTabToIssuer={that.props.changeTabInUserPageToIssuer}
                changeTabToMyCertificates={that.props.changeTabInUserPageToMyCertificates}
                tab={that.props.state.tabInUserPage}
                isNotFound={that.props.state.userIsNotFound}
              /> } />
              <Route exact path="/users/:address/issued/:index" render={ (routeProps) => <CertViewComponent {...routeProps} 
                certificates={that.props.state.certificatesIIssuedInUserPage}
                client={clientWithoutAccount}
                getCertificates={that.props.getCertificatesInUserPage}
                fromUserPage={true}
              /> } />
              <Route exact path="/users/:address/certs/:index" render={ (routeProps) => <CertViewComponent {...routeProps} 
                certificates={that.props.state.certificatesInUserPage}
                client={clientWithoutAccount}
                getCertificatesIIssued={that.props.getCertificatesIIssuedInUserPage}
                fromUserPage={true}
              /> } />
              <Route exact path="/issued/:index" render={ (routeProps) => <CertViewComponent {...routeProps}
                certificates={that.props.state.certificatesIIssued}
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
