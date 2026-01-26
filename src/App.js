import './App.css';
import EncryptionPanel from './components/EncryptionPanel';
import DecryptionPanel from './components/DecryptionPanel';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Chaos Encryption Engine</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {/* Left Side: Encrypt */}
        <EncryptionPanel />
        
        {/* Right Side: Decrypt */}
        <DecryptionPanel />
      </div>
    </div>
  );
}

export default App;