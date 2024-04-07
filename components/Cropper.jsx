import React, { useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ src }) => {
  const imageRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCrop = () => {
    if (!imageRef.current) return;

    const cropper = new Cropper(imageRef.current, {
      aspectRatio: 1, // Make it a square
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        const dataUrl = canvas.toDataURL(); // Get cropped image as base64 data URL
        setCroppedImage(dataUrl);
      },
    });
  };

  return (
    <div>
      <img src={src} ref={imageRef} onLoad={handleCrop} alt="Original" />
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  );
};

export default ImageCropper;