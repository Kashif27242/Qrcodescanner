import React, { useState } from 'react';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [bwImage, setBwImage] = useState(null);
  const [filenames, setFilenames] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img.src);
        setBwImage(convertToBlackAndWhite(img));
        setFilenames([file.name]);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const convertToBlackAndWhite = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = brightness; // red
      data[i + 1] = brightness; // green
      data[i + 2] = brightness; // blue
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  return (
    <div>
      <h1>Image to Black and White Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {originalImage && (
        <div>
          <h2>Original Image: {filenames[0]}</h2>
          <img src={originalImage} alt="Original" />
        </div>
      )}

      {bwImage && (
        <div>
          <h2>Black and White Image: {filenames[0]}</h2>
          <img src={bwImage} alt="Black and White" />
        </div>
      )}
    </div>
  );
}

export default App;
