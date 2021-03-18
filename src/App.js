import "./App.css";
import "./Header.css";
import React from "react";
import { getGoogleUid } from "./Google";
import * as CertClient from "gxcert-iota";
import * as ipfs from "./ipfs";
import * as image from "./image";
import Login from "./Login";
import { IssueComponent } from "./Issue";
import { SettingComponent } from "./Setting";
import CommunicationLoading from "./loading";
import { CertListComponent } from "./Certificate";
import { MyInfoComponent } from "./MyInfo";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ShowComponent } from "./Show";

const showRef = React.createRef();

let uid = sessionStorage.getItem("uid");
let client = null;
if (uid !== null) {
  client = new CertClient("https://nodes.devnet.iota.org", uid);
  client.address = sessionStorage.getItem("address");
}


const UI = {
  byId: function(id) {
    return document.getElementById(id);
  },
  showErrorMessage: function(message) {
    this.byId("error-message").innerText = message;
  },
  showMessage: function(message) {
    this.byId("message").innerText = message;
  },
  refreshCertificates: function(certificates) {
    showRef.current.setState({ certificates: [] });
    showRef.current.setState({ certificates: certificates });
  },
  resetTabSelected: function () {
    this.byId("issue-tab").classList.remove("selected");
    this.byId("show-tab").classList.remove("selected");
    this.byId("issue").classList.remove("hidden");
    this.byId("show").classList.remove("hidden");
  },
  changeTabToIssue: function() {
    this.resetTabSelected();
    this.byId("issue-tab").classList.add("selected");
    this.byId("show").classList.add("hidden");
  },
  changeTabToShow: function() {
    this.resetTabSelected();
    this.byId("show-tab").classList.add("selected");
    this.byId("issue").classList.add("hidden");
  }
}



function isShowPage(queries) {
  if ("index" in queries && "address" in queries) {
    return true;
  }
  return false;
}
function getUrlQueries() {
  let queryStr = window.location.search.slice(1);
  let queries = {};
  if (!queryStr) {
    return queries;
  }
  queryStr.split("&").forEach(function (queryStr) {
    var queryArr = queryStr.split("=");
    queries[queryArr[0]] = queryArr[1];
  });
  return queries;
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
    this.state = {
      showPageIsLoading: false,
    }
  }
  copyPubkey() {
    const copyFrom = document.createElement("textarea");
    copyFrom.textContent = client.address;
    const bodyElm = document.getElementsByTagName("body")[0];
    bodyElm.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    bodyElm.removeChild(copyFrom);
    UI.showMessage("Copied your ID!");
  }
  showPubkey() {
    UI.byId("my-pubkey").innerText = "Your ID is " + client.address.substr(0, 8) + "...   ";
  }
  async showCertificate(holder, index) {
    let certificate;
    try {
      certificate = await client.getCertificate(holder, index);
    } catch(err) {
      console.error(err);
      UI.showErrorMessage("Failed to fetch certificate.");
    }
    if (certificate === undefined) {
      UI.showErrorMessage("Certificate not found.");
      return;
    }
    UI.refreshCertificates([certificate]);
  }
  async showCertificates() {
    const holder = parseInt(UI.byId("holder").value);
    console.log(holder);
    let certificates;
    this.setState({
      showPageIsLoading: true,
    });
    try {
      certificates = await client.getCertificates(holder);
    } catch (err) {
      console.error(err);
      UI.showErrorMessage("Failed to fetch certificates.");
    }
    this.setState({
      showPageIsLoading: false,
    });
    console.log(certificates);
    UI.refreshCertificates(certificates);
  }
  async createCertificate() {
    if (client === null) {
      return;
    }
    let ipfsHash = null;
    const address = UI.byId("receiver").value;
    this.setState({
      issuePageIsLoading: true,
    });
    const imageData = await image.fileInputToDataURL(UI.byId("cert-image"));
    try {
      const blob = image.createBlobFromImageDataURI(imageData);
      ipfsHash = await ipfs.postCertificate(blob);
    } catch (err) {
      UI.showErrorMessage("Failed to issue a certificate.");
      return;
    }
    const certificate = client.createCertificateObject(ipfsHash);
    try {
      await client.issueCertificate(certificate, address);
    } catch (err) {
      UI.showErrorMessage("Failed to issue a certificate.");
    }
    this.setState({
      issuePageIsLoading: false,
    });
    UI.showMessage("Successfully completed issuesing a certificate.");
  }
  componentDidMount() {
    //this.showPubkey();
    const queries = getUrlQueries();
    if (isShowPage(queries)) {
      this.showCertificate(queries.address, parseInt(queries.index));
    }
  }
  gotoMyInfo() {
    this.setState({
      
    });
  }
  render() {
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
              <Route exact path="/" render={ () => <ShowComponent client={client} address={client.address} /> } />
              <Route exact path="/issue" render={ () => <IssueComponent /> } />
              <Route exact path="/user" render={ () => <SettingComponent /> } />
            </Switch>
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
