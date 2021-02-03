import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import * as components from "./components";
import * as eos from "./eos";

async function showCertificates() {
  const receiver = document.getElementById("receiver").value;
  const certificates = await eos.getMyCertificates(receiver);
  ReactDOM.render(<components.CertificateComponents certificates={certificates} />, document.getElementById("result"));
}

function App() {
  return (
    <div className="App">
      <div className="Main">
        issueser: <input type="text" id="issueser"/><br/>
        receiver: <input type="text" id="receiver"/><br/>
        cert-image: <input type="file" id="cert-image" onChange={ eos._createCertificate } /><br />
        <input type="button" onClick={ showCertificates }/><br/>
      </div>
      <div id="result">
      </div>
    </div>
  )
}

export default App;
