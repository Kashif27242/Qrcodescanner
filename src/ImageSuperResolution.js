import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { QRCode } from 'jsqr';

const App = () => {
  const [qrData, setQrData] = useState('');

  const handleScan = (result) => {
    if (result) {
      setQrData(result);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleImageLoad = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const { width, height } = image;

        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);

        const imageData = context.getImageData(0, 0, width, height);
        const qrCode = QRCode(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          setQrData(qrCode.data);
        } else {
          setQrData('No QR code found');
        }
      };
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <div style={containerStyle}>
      <h1>QR Code Decoder</h1>
      <div style={scannerContainerStyle}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={scannerStyle}
        />
      </div>
      <div style={qrDataContainerStyle}>
        <h2>QR Code Data:</h2>
        <p>{qrData}</p>
      </div>
      <div style={fileInputContainerStyle}>
        <h2>Decode QR Code from Image:</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageLoad}
          style={fileInputStyle}
        />
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2rem',
};

const scannerContainerStyle = {
  width: '100%',
  maxWidth: '400px',
  margin: '2rem 0',
};

const scannerStyle = {
  width: '100%',
};

const qrDataContainerStyle = {
  margin: '2rem 0',
  textAlign: 'center',
};

const fileInputContainerStyle = {
  margin: '2rem 0',
};

const fileInputStyle = {
  marginTop: '1rem',
};

export default App;
