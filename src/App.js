import logo from './logo.svg';
import './App.css';
import "./form.css";
import ReactDOM from "react-dom";
import * as components from "./components";
import * as eos from "./eos";

async function showCertificates() {
  const receiver = document.getElementById("holder").value;
  const certificates = await eos.getMyCertificates(receiver);
  ReactDOM.render(<components.CertificateComponents certificates={certificates} />, document.getElementById("result"));
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
        <div className="tabs">
          <div className="issue-tab tab selected" id="issue-tab" onClick={ changeTabToIssue }>
            Issue
          </div>
          <div className="show-tab tab" id="show-tab" onClick= { changeTabToShow }>
            Show
          </div>
        </div><br/>
        <div id="show" className="show" class="form-group hidden">
          <h2>Show Certificates</h2>
          <label>Certificate Holder</label>
          <input type="text" id="holder" class="form-control" placeholder="alice" />
          <input type="button" value="Show certificates" onClick={ showCertificates } id="show-cert" class="form-control" /><br/>
          <div id="result">
          </div>
        </div>
        <div className="issue" class="form-group" id="issue">
          <h2>Issue Certificate</h2>
          <label for="issueser">issueser</label>
          <input type="text" id="issueser" class="form-control" placeholder="alice" />
          <label for="receiver">receiver</label> 
          <input type="text" id="receiver" class="form-control" placeholder="bob" />
          <label>Certificate Image</label>
          <input type="file" id="cert-image" class="form-control" /><br />
          <input type="button" id="issue-button" class="form-control" value="Issue" onClick={ eos._createCertificate } />
        </div>
      </div>
    </div>
  )
}

export default App;
