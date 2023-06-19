import React, { useState } from 'react';
import jsQR from 'jsqr';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [QRCodeContent, setQRCodeContent] = useState('');

  const handleScan = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setQRCodeContent('');
    decodeQRCode(file);
  };

  const decodeQRCode = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code) {
        setQRCodeContent(code.data);
      } else {
        setQRCodeContent('');
      }
    };
  };

  return (
    <div className="container">
      <h1 className="title">QR Code Scanner</h1>
      <input type="file" accept="image/*" onChange={handleScan} />
      {selectedImage && <img className="qr-image" src={selectedImage} alt="Selected QR Code" />}
      {QRCodeContent ? (
        <div className="result">
          <h2 className="result-title">QR Code Content:</h2>
          <p className="result-content">{QRCodeContent}</p>
        </div>
      ) : (
        <p className="no-result">No QR Code found or unable to decode.</p>
      )}
    </div>
  );
};

export default App;
