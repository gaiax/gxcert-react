import logo from './logo.svg';
import './App.css';
import * as components from "./components";
import * as eos from "./eos";

function App() {
  return (
    <div className="App">
      <div className="Main">
        issueser: <input type="text" id="issueser"/><br/>
        receiver: <input type="text" id="receiver"/><br/>
        cert-image: <input type="file" id="cert-image" onChange={ eos._createCertificate } /><br />
      </div>
      <div id="result">
      </div>
    </div>
  )
}

export default App;
