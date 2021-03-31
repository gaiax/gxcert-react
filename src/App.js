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
import { getImageOnIpfs } from "./image-upload";

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
  async issue(evt) {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    this.setState({
      issuePageIsLoading: true,
    });
    const address = evt.address;
    const ipfsHash = evt.ipfsHash;
    const certificate = client.createCertificateObject(ipfsHash);
    try {
      await client.issueCertificate(certificate, address);
    } catch(err) {
      console.error(err);
      this.isProcessing = false;
      this.setState({
        issuePageIsLoading: false,
        message: "Failed to issue a certificate.",
      });
      return;
    }
    this.isProcessing = false;
    this.setState({
      issuePageIsLoading: false,
      message: "Successfully completed issuesing a certificate."
    });
  }
  async updateUserSetting(evt) {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    this.setState({
      userSettingPageIsLoading: true,
    });
    if (evt.icon !== null) {
      console.log(evt);
      try {
        await client.registerIcon(evt.icon);
      } catch(err) {
        console.error(err);
        this.isProcessing = false;
        this.setState({
          userSettingPageIsLoading: false,
          message: "Failed to update your name.",
        });
        return;
      }
    }
    if (evt.name !== null) {
      const name = evt.name;
      try {
        await client.registerName(name);
      } catch(err) {
        console.error(err);
        this.isProcessing = false;
        this.setState({
          userSettingPageIsLoading: false,
          message: "Failed to update your profile.",
        });
        return;
      }
    }
    this.isProcessing = false;
    this.setState({
      userSettingPageIsLoading: false,
      message: "Successfully updated your profile.",
    });
  }
  closeModal() {
    this.setState({
      issuePageIsLoading: false,
      message: null,
    });
  }
  render() {
    const that = this;
    const modalIsShow = this.props.state.isLoading;
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
        <h2 className="brand-logo">GxCert</h2>
        <Link to="/issue" className="header-issue-button header-button">Issue</Link>
        <Link to="/" className="header-show-button header-button">Show</Link>
        </header>
        <div className="main">
          <Switch>
            <Route exact path="/" render={ () => <MyPageComponent address={client.address} isLoading={that.props.state.myPageIsLoading} certificates={that.props.state.certificates} icon={icon} getCertificates={that.props.getCertificates} /> } />
            <Route exact path="/issue" render={ () => <IssueComponent onClickIssueButton={this.props.issue} onChangeCertificateImage={this.props.onChangeCertificateImage} onChangeIssueTo={this.props.onChangeIssueTo} /> } />
            <Route exact path="/user" render={ () => <SettingComponent onClickUpdateButton={this.props.updateUserSetting} onChangeName={this.props.onChangeName} onChangeIcon={this.props.onChangeIcon} /> } />
            <Route exact path="/certs/:index" render={ (routeProps) => <CertViewComponent {...routeProps} certificates={that.props.state.certificates} />} />
          </Switch>
        </div>
        <BsModal show={modalIsShow} onClickBackButton={this.closeModal.bind(this)} isLoading={isLoading} message={this.state.message}/>
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
