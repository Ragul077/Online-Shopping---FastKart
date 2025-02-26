import React, { useState, useEffect } from "react";
import "./ImageSlider.css"; 
import img1 from "./images/img1.jpeg";
import img2 from "./images/img2.jpeg";
import img3 from "./images/img3.webp";
import img4 from "./images/img4.webp";
import offer from "./images/offer.gif";

const images = [img1, img2, img3, img4];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider">
      <img src={offer} alt="sale" className="img1"></img>
      <img src={images[currentImageIndex]} alt="Image Slider" className="medicallog" />
      <img src={offer} alt="sale" className="img1"></img>
    </div>
  );
};

export default ImageSlider;
