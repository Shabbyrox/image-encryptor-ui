import React, { useState } from 'react';
import axios from 'axios';

const EncryptionPanel = () => {
      const API_URL = process.env.REACT_APP_API_URL;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onEncrypt = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setIsLoading(true);


    const formData = new FormData();
    formData.append("image", selectedFile); // Key must match @RequestParam("image") in Java

    try {
      // THE IMPORTANT PART: Requesting a BLOB (Binary Large Object)
      const response = await axios.post(
        `${API_URL}/api/crypto/encrypt`, 
        formData, 
        {
          responseType: 'blob', // IMPORTANT: Tells Axios "Don't parse this as text, it's a file"
        }
      );

      // Create a fake link to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'secure_bundle.zip'); // Name of the file
      document.body.appendChild(link);
      link.click(); // Programmatically click the link
      link.remove(); // Clean up

    } catch (error) {
      console.error("Encryption failed:", error);
      alert("Encryption failed! Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-panel">
      <div className="panel-header">
        <h2>Encrypt Image</h2>
        <p>Secure your photo and generate a downloadable key bundle.</p>
      </div>
      
      <div className="file-input-group">
        <label>Select Image</label>
        <div className="file-upload-box">
          <input type="file" onChange={onFileChange} accept="image/*" />
        </div>
      </div>
      
      <button 
        className="action-button primary-btn"
        onClick={onEncrypt} 
        disabled={isLoading}
      >
        {isLoading && <span className="spinner"></span>}
        {isLoading ? "Encrypting..." : "Encrypt Image"}
      </button>
    </div>
  );
};

export default EncryptionPanel;