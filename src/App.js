import './App.css';
import EncryptionPanel from './components/EncryptionPanel';
import DecryptionPanel from './components/DecryptionPanel';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="main-title">Secure Image Vault</h1>
        <p className="subtitle">Client-side encryption for your sensitive media</p>
      </div>
      
      <div className="panel-container">
        {/* Left Side: Encrypt */}
        <EncryptionPanel />
        
        {/* Right Side: Decrypt */}
        <DecryptionPanel />
      </div>
    </div>
  );
}

export default App;