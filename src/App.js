import "./App.css";
import React from "react";
import { CertificateComponents } from "./Certificate";
import { getGoogleUid } from "./Google";
import * as CertClient from "gxcert-iota";
import * as ipfs from "./ipfs";
import * as image from "./image";
import Login from "./Login";

const resultRef = React.createRef();


let client = null;

async function init(){
};

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
  let ipfsHash = null;
  const address = byId("receiver").value;
  const imageData = await image.fileInputToDataURL(byId("cert-image"));
  try {
    const blob = image.createBlobFromImageDataURI(imageData);
    ipfsHash = await ipfs.postCertificate(blob);
  } catch (err) {
    showErrorMessage("Failed to issue a certificate.");
    return;
  }
  const certificate = client.createCertificateObject(ipfsHash);
  try {
    await client.issueCertificate(certificate, address);
  } catch (err) {
    showErrorMessage("Failed to issue a certificate.");
  }
  showMessage("Successfully completed issuesing a certificate.");
}

/*
 *
function isShowPage(queries) {
  if ("key" in queries && "user" in queries) {
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
*/
function refreshCertificates(certificates) {
  resultRef.current.setState({ certificates: [] });
  resultRef.current.setState({ certificates: certificates });
}



async function showCertificates() {
  const holder = byId("holder").value;
  console.log(holder);
  let certificates;
  try {
    certificates = await client.getCertificates(holder);
  } catch (err) {
    console.error(err);
    showErrorMessage("Failed to fetch certificates.");
  }
  console.log(certificates);
  refreshCertificates(certificates);
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


class App extends React.Component {
  async init() {
    const uid = await getGoogleUid();
    client = new CertClient("https://nodes.devnet.iota.org", uid);
    await client.init();
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
  componentDidMount() {
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
