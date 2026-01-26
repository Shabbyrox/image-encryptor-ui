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
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Encrypt Image</h2>
      <p>Upload a photo to generate a secure ZIP bundle.</p>
      
      <input type="file" onChange={onFileChange} accept="image/*" />
      
      <br /><br />
      
      <button 
        onClick={onEncrypt} 
        disabled={isLoading}
        style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {isLoading ? "Encrypting (Please Wait)..." : "Encrypt & Download"}
      </button>
    </div>
  );
};

export default EncryptionPanel;