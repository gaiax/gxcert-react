import "./App.css";
import React from "react";
import { CertificateComponents } from "./Certificate";
import { getCertificate, getCertificates, CertClient } from "./eos";
import firebase from "./Firebase";
const provider = new firebase.auth.GoogleAuthProvider();
const ecc = require("eosjs-ecc");

const resultRef = React.createRef();

const rpcHost = "http://localhost:8888";
const privateKey = window.prompt("enter private key of your account", "");

let client = null;
if (privateKey !== null) {
  try {
    client = new CertClient(privateKey, rpcHost);
  } catch (err) {
    console.error(err);
  }
}

function byId(id) {
  return document.getElementById(id);
}

function showErrorMessage(message) {
  byId("error-message").innerText = message;
}

function showMessage(message) {
  byId("message").innerText = message;
}

async function createCertificate() {
  if (client === null) {
    return;
  }
  try {
    await client._createCertificate();
  } catch (err) {
    showErrorMessage("Failed to issue a certificate.");
    return;
  }
  showMessage("Successfully completed issuesing a certificate.");
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
function refreshCertificates(certificates) {
  resultRef.current.setState({ certificates: [] });
  resultRef.current.setState({ certificates: certificates });
}

async function verifyCertificates(holder, certificates) {
  if (client !== null) {
    const withVerified = async (certificates) => {
      let promises = certificates.map((certificate) => {
        return client.verifyCertificate(holder, certificate.key);
      });
      return await Promise.all(promises);
    };
    const verifieds = await withVerified(certificates);
    for (let i = 0; i < certificates.length; i++) {
      certificates[i].verified = verifieds[i];
    }
  }
}

async function showCertificate(queries) {
  const key = parseInt(queries["key"]);
  const holder = queries["user"];
  let certificate;
  try {
    certificate = await getCertificate(holder, key);
  } catch (err) {
    console.error(err);
    return;
  }
  let certificates = [certificate];
  await verifyCertificates(holder, certificates);
  refreshCertificates(certificates);
}

async function showCertificates() {
  const holder = byId("holder").value;
  try {
    let certificates = await getCertificates(holder);
    await verifyCertificates(holder, certificates);
    refreshCertificates(certificates);
  } catch (err) {
    console.error(err);
    showErrorMessage("Failed to fetch certificates.");
  }
}

function resetTabSelected() {
  byId("issue-tab").classList.remove("selected");
  byId("show-tab").classList.remove("selected");
  byId("issue").classList.remove("hidden");
  byId("show").classList.remove("hidden");
}

function changeTabToIssue() {
  resetTabSelected();
  byId("issue-tab").classList.add("selected");
  byId("show").classList.add("hidden");
}

function changeTabToShow() {
  resetTabSelected();
  byId("show-tab").classList.add("selected");
  byId("issue").classList.add("hidden");
}

function isShowPage(queries) {
  if ("key" in queries && "user" in queries) {
    return true;
  }
  return false;
}

async function getPrivateKeyFromGoogle() {
  let uid;
  try {
    uid = await getGoogleUid();
  } catch(err) {
    console.error(err);
    return;
  }
  const wif = ecc.seedPrivate(uid + ": You are super lucky!!!");
  return wif;
}
async function getGoogleUid() {
  const result = await firebase.auth().signInWithPopup(provider)
  return result.user.uid;
}
class App extends React.Component {
  componentDidMount() {
    const queries = getUrlQueries();
    if (isShowPage(queries)) {
      showCertificate(queries);
    }
  }
  render() {
    return (
      <div className="App">
        <div className="main">
          <p id="error-message"></p>
          <p id="message"></p>
          <div className="tabs">
            <div
              className="issue-tab tab"
              id="issue-tab"
              onClick={changeTabToIssue}
            >
              Issue
            </div>
            <div
              className="show-tab tab selected"
              id="show-tab"
              onClick={changeTabToShow}
            >
              Show
            </div>
          </div>
          <br />
          <div id="show" className="show form-group">
            <h2>Show Certificates</h2>
            <label>Certificate Holder</label>
            <input
              type="text"
              id="holder"
              className="form-control"
              placeholder="alice"
            />
            <input
              type="button"
              value="Show certificates"
              onClick={showCertificates}
              id="show-cert"
              className="form-control"
            />
            <br />
            <CertificateComponents ref={resultRef} certificates={[]} />
          </div>
          <div className="issue form-group hidden" id="issue">
            <h2>Issue Certificate</h2>
            <label>issueser</label>
            <input
              type="text"
              id="issueser"
              className="form-control"
              placeholder="alice"
            />
            <label>receiver</label>
            <input
              type="text"
              id="receiver"
              className="form-control"
              placeholder="bob"
            />
            <label>Certificate Image</label>
            <input type="file" id="cert-image" className="form-control" />
            <br />
            <input
              type="button"
              id="issue-button"
              className="form-control"
              value="Issue"
              onClick={createCertificate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
