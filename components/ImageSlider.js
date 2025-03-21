// components/ImageSlider.js
import { useEffect, useState } from 'react';

const images = [
  '/Home1.png',
  '/Home2.png',
  '/Home3.png',
  '/Home4.png',
  // '/images/image2.jpg',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleClick = () => {
    changeImage();
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 3000); // Change image every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div onClick={handleClick}>
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        style={{
          transition: 'opacity 1s ease-in-out',
        }}
      />
    </div>
  );
};

export default ImageSlider;