import logo from './logo.svg';
import './App.css';
import * from "./components";

function App() {
  return (
    <div className="App">
      <div className="Main">
        issueser: <input type="text" id="issueser"><br>
        receiver: <input type="text" id="receiver"><br>
        cert-image: <input type="file" id="cert-image"><br>
      </div>
      <div id="result">
      </div>
    </div>
  );
}

export default App;
