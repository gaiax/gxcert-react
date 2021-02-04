import "./App.css";
import "./form.css";
import React from "react";
import * as components from "./components";
import { getMyCertificates, CertClient } from "./eos";

const resultRef = React.createRef();

const rpcHost = "http://localhost:8888";

let client = null;

function showErrorMessage(message) {
  document.getElementById("message").innerText = message;
}
async function createCertificate() {
  if (client === null) {
    return;
  }
  try {
    await client._createCertificate();
  } catch (err) {
    showErrorMessage("Failed to issue a certificate.");
  }
}

async function showCertificates() {
  const receiver = document.getElementById("holder").value;
  try {
    const certificates = await getMyCertificates(receiver);
    resultRef.current.setState({ certificates: certificates });
  } catch (err) {
    showErrorMessage("Failed to fetch certificates.");
  }
}

function resetTabSelected() {
  document.getElementById("issue-tab").classList.remove("selected");
  document.getElementById("show-tab").classList.remove("selected");
  document.getElementById("issue").classList.remove("hidden");
  document.getElementById("show").classList.remove("hidden");
}

function changeTabToIssue() {
  resetTabSelected();
  document.getElementById("issue-tab").classList.add("selected");
  document.getElementById("show").classList.add("hidden");
  if (client === null) {
    const privateKey = window.prompt("enter private key of your account", "");
    console.log(privateKey);
    if (privateKey === null) {
      changeTabToShow();
      return;
    }
    try {
      client = new CertClient(privateKey, rpcHost);
    } catch (err) {
      console.error(err);
      changeTabToShow();
    }
  }
}

function changeTabToShow() {
  resetTabSelected();
  document.getElementById("show-tab").classList.add("selected");
  document.getElementById("issue").classList.add("hidden");
}

function App() {
  return (
    <div className="App">
      <div className="main">
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
        <div id="show" className="show" class="form-group">
          <h2>Show Certificates</h2>
          <label>Certificate Holder</label>
          <input
            type="text"
            id="holder"
            class="form-control"
            placeholder="alice"
          />
          <input
            type="button"
            value="Show certificates"
            onClick={showCertificates}
            id="show-cert"
            class="form-control"
          />
          <br />
          <components.CertificateComponents ref={resultRef} certificates={[]} />
        </div>
        <div className="issue" class="form-group hidden" id="issue">
          <h2>Issue Certificate</h2>
          <label for="issueser">issueser</label>
          <input
            type="text"
            id="issueser"
            class="form-control"
            placeholder="alice"
          />
          <label for="receiver">receiver</label>
          <input
            type="text"
            id="receiver"
            class="form-control"
            placeholder="bob"
          />
          <label>Certificate Image</label>
          <input type="file" id="cert-image" class="form-control" />
          <br />
          <input
            type="button"
            id="issue-button"
            class="form-control"
            value="Issue"
            onClick={createCertificate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
