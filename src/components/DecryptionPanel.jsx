import React, { useState } from 'react';
import axios from 'axios';

const DecryptionPanel = () => {

    const API_URL = process.env.REACT_APP_API_URL;
  // 1. STATE: We need two slots now
  const [imageFile, setImageFile] = useState(null);
  const [keyFile, setKeyFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. HANDLERS
  const onImageChange = (e) => setImageFile(e.target.files[0]);
  const onKeyChange = (e) => setKeyFile(e.target.files[0]);

  // 3. LOGIC
  const onDecrypt = async () => {
    if (!imageFile || !keyFile) {
      alert("Please select BOTH the encrypted image and the secret key!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile); // Matches @RequestParam("image")
    formData.append("key", keyFile);     // Matches @RequestParam("key")

    try {
      const response = await axios.post(
        `${API_URL}/api/crypto/encrypt`, // Note the different endpoint
        formData, 
        { responseType: 'blob' }
      );

      // Download Logic (It returns a PNG this time, not a ZIP)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'restored_image.png');
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Decryption failed:", error);
      alert("Decryption failed! Did you use the correct key?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '400px', margin: '20px auto', backgroundColor: '#f9f9f9' }}>
      <h2>Decrypt Image</h2>
      <p>Unlock your photos using the Secret Key.</p>
      
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>1. Encrypted Image:</label>
        <input type="file" onChange={onImageChange} accept="image/*" />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>2. Secret Key:</label>
        <input type="file" onChange={onKeyChange} accept=".key" />
      </div>
      
      <br />
      
      <button 
        onClick={onDecrypt} 
        disabled={isLoading}
        style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {isLoading ? "Decrypting..." : "Unlock Image"}
      </button>
    </div>
  );
};

export default DecryptionPanel;