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
        `${API_URL}/api/crypto/decrypt`, // Note the different endpoint
        formData, 
        { headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob' }
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
    <div className="card-panel">
      <div className="panel-header">
        <h2>Decrypt Image</h2>
        <p>Restore your original photo using the secret key.</p>
      </div>
      
      <div className="file-input-group">
        <label>Encrypted Image</label>
        <div className="file-upload-box">
          <input type="file" onChange={onImageChange} accept="image/*" />
        </div>
      </div>

      <div className="file-input-group">
        <label>Secret Key File</label>
        <div className="file-upload-box">
          <input type="file" onChange={onKeyChange} accept=".key" />
        </div>
      </div>
      
      <button 
        className="action-button secondary-btn"
        onClick={onDecrypt} 
        disabled={isLoading}
      >
        {isLoading && <span className="spinner"></span>}
        {isLoading ? "Decrypting..." : "Unlock Image"}
      </button>
    </div>
  );
};

export default DecryptionPanel;