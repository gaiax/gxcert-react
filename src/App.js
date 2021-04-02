import "./App.css";
import React from "react";
import { getGoogleUid } from "./util";
import CertClient from "./client";
import Login from "./views/Login";
import { IssueComponent } from "./views/Issue";
import { SettingComponent } from "./views/Setting";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { MyPageComponent } from "./views/MyPage";
import { CertViewComponent } from "./views/CertView";
import BsModal from "./views/components/BsModal";

let client = null;
function initializeClient() {
  let uid = sessionStorage.getItem("uid");
  if (uid !== null) {
    client = new CertClient(uid);
    client.address = sessionStorage.getItem("address");
    console.log(client.address);
  }
}

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
  showPubkey() {
    UI.byId("my-pubkey").innerText = "Your ID is " + client.address.substr(0, 8) + "...   ";
  }
  saveToSessionStorage(uid, address) {
    sessionStorage.setItem("uid", uid);
    sessionStorage.setItem("address", address);
  }
  async init() {
    const uid = await getGoogleUid();
    client = new CertClient(uid);
    await client.init();
    if (uid) {
      this.saveToSessionStorage(uid, client.address);
    }
    console.log(client.address); 
    this.forceUpdate();
  }
  componentDidMount() {
    if (client !== null) {
      this.props.getMyProfile();
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
    let icon = "";
    if (profile) {
      icon = profile.icon;
    }
    const login = (
      <Login onClick={this.init.bind(this)} />
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
              icon={icon} 
              getCertificates={that.props.getCertificates} 
              exportAccount={that.props.exportAccount}
              path={"certs"}
            /> } />
            <Route exact path="/issue" render={ () => <IssueComponent 
              onClickIssueButton={this.props.issue} 
              onChangeCertificateImage={this.props.onChangeCertificateImage} 
              onChangeIssueTo={this.props.onChangeIssueTo} 
              onChangeTitle={this.props.onChangeTitle}
            /> } />
            <Route exact path="/user" render={ () => <SettingComponent 
              onClickUpdateButton={this.props.updateUserSetting} 
              onChangeName={this.props.onChangeName} 
              onChangeIcon={this.props.onChangeIcon} 
            /> } />
            <Route exact path="/issuesed/:index" render={ (routeProps) => <CertViewComponent {...routeProps}
              certificates={that.props.state.certificatesIIssuesed}
            />} />
            <Route exact path="/certs/:index" render={ (routeProps) => <CertViewComponent {...routeProps} 
              certificates={that.props.state.certificates} 
            />} />
          </Switch>
        </div>
        <BsModal show={modalIsShow} closeModal={this.props.closeModal} isLoading={isLoading} message={this.props.state.message} errorMessage={this.props.state.errorMessage}/>
      </div>
    );
    return (
      <Router>
        <div className="App">
          { client === null ? login : main }
        </div>
      </Router>
    );
  }
}

initializeClient();
export default App;
