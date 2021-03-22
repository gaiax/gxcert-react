import "./App.css";
import React from "react";
import { getGoogleUid } from "./util";
import * as CertClient from "gxcert-iota";
import Login from "./views/Login";
import { IssueComponent } from "./views/Issue";
import { SettingComponent } from "./views/Setting";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { MyPageComponent } from "./views/MyPage";
import { CertViewComponent } from "./views/CertView";

let client = null;
function initializeClient() {
  let uid = sessionStorage.getItem("uid");
  if (uid !== null) {
    client = new CertClient("https://nodes.devnet.iota.org", uid);
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
  saveToSessionStorage(uid, address) {
    sessionStorage.setItem("uid", uid);
    sessionStorage.setItem("address", address);
  }
  async init() {
    const uid = await getGoogleUid();
    client = new CertClient("https://nodes.devnet.iota.org", uid);
    await client.init();
    if (uid) {
      this.saveToSessionStorage(uid, client.address);
    }
    console.log(client.address); 
    this.forceUpdate();
  }
  render() {
    return (
      <div className="App">
        { client === null?  <Login onClick={this.init.bind(this)} /> : <CertApp /> }
      </div>
    );
  }
}

class CertApp extends React.Component {
  constructor() {
    super();
    this.myPageRef = React.createRef();
    this.state = {
      showPageIsLoading: false,
      isLoading: true,
    }
  }
  showPubkey() {
    UI.byId("my-pubkey").innerText = "Your ID is " + client.address.substr(0, 8) + "...   ";
  }
  async issue(evt) {
    const address = evt.address;
    const ipfsHash = evt.ipfsHash;
    const certificate = client.createCertificateObject(ipfsHash);
    try {
      await client.issueCertificate(certificate, address);
    } catch(err) {
      UI.showErrorMessage("Failed to issue a certificate.");
    }
    this.setState({
      issuePageIsLoading: false,
    });
    UI.showMessage("Successfully completed issuesing a certificate.");
  }
  componentDidMount() {
    this.fetchMyCertificates();
  }
  async fetchMyCertificates() {
    let certificates = null;
    try {
      certificates = await client.getCertificates();
    } catch (err) {
      UI.showErrorMessage("Failed to fetch your certificates.");
      return;
    }
    console.log(certificates);
    this.setState({
      isLoading: false,
      certificates,
    });
  }
  render() {
    const that = this;
    return (
      <Router>
        <div className="App">
          <header>
          <h2 className="brand-logo">GxCert</h2>
          <Link to="/issue" className="header-issue-button header-button">Issue</Link>
          <Link to="/" className="header-show-button header-button">Show</Link>
          </header>
          <div className="main">
            <Switch>
              <Route exact path="/" render={ () => <MyPageComponent address={client.address} ref={that.myPageRef} isLoading={this.state.isLoading} certificates={this.state.certificates} /> } />
              <Route exact path="/issue" render={ () => <IssueComponent onClickIssueButton={this.issue} /> } />
              <Route exact path="/user" render={ () => <SettingComponent /> } />
              <Route exact path="/certs/:index" render={ (routeProps) => <CertViewComponent {...routeProps} certificates={that.certificates} />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

initializeClient();
export default App;
