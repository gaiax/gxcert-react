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
    const modalIsShow = this.props.state.isLoading || this.props.state.message !== null || this.props.state.errorMessage !== null;
    const isLoading = this.props.state.isLoading;
    const profile = this.props.state.myProfile;
    const client = this.props.state.client;
    let name = "";
    if (client !== null && client.profile !== null) {
      name = client.profile.name;
    }
    let icon = "";
    if (profile) {
      icon = profile.icon;
    }
    const login = (
      <Login onClick={this.props.loginWithGoogle} />
    );
    const main = (
        <div className="main">
          <header>
          <h2 className="brand-logo"><a href="/">GxCert</a></h2>
          <Link to="/issue" className="header-issue-button header-button">Issue</Link>
          <Link to="/" className="header-show-button header-button">{client !== null ? client.address.substr(0, 6) + "..." : "Profile" }</Link>
          </header>
          <div className="main">
            <Switch>
              <Route exact path="/" render={ () => <MyPageComponent 
                address={client.address} 
                isLoading={that.props.state.myPageIsLoading} 
                certificates={that.props.state.certificates} 
                certificatesIIssuesed={that.props.state.certificatesIIssuesed}
                icon={icon} 
                getCertificates={that.props.getCertificates} 
                getCertificatesIIssuesed={that.props.getCertificatesIIssuesed} 
                exportAccount={that.props.exportAccount}
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
          <BsModal show={modalIsShow} closeModal={this.props.closeModal} isLoading={isLoading} message={this.props.state.message} errorMessage={this.props.state.errorMessage}/>
        </div>
    );
    return (
        <div className="App">
          { !this.props.location.pathname.startsWith("/users/") && client === null ? login : main }
          <BsModal show={modalIsShow} closeModal={this.props.closeModal} isLoading={isLoading} message={this.props.state.message} errorMessage={this.props.state.errorMessage}/>
        </div>
    );
  }
}

export default withRouter(App);
