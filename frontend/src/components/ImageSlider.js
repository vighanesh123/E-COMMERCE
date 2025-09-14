import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Define 3 images for the slider
  const images = [
    'https://media.bazaarvoice.com/Shutterstock_1875797686.png',
    'https://dinarys.com/photos/7/imgonline-com-ua-Resize-SYEKlBcqIuhib.jpg',
    'https://fintech.com.br/app/uploads/2023/06/eletro.png'
  ];

  // Automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[400px] overflow-hidden">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={image} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover"
          />
          
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-black/60 via-black/40 to-black/60">
            <div className="text-center px-4 sm:px-6 lg:px-8 w-full">
              <div className="mx-auto">
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 text-white">
                  Your Electronics
                  <span className="block text-yellow-300">Destination</span>
                </h1>
                <p className="text-sm sm:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-white/80 max-w-2xl mx-auto px-2">
                  Discover the latest smartphones, laptops, and speakers from top brands.
                </p>
                <Link
                  to="/products"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-2 px-4 sm:py-3 sm:px-6 lg:py-3 lg:px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center text-sm sm:text-base"
                >
                  Shop Now
                  <ArrowRight size={16} className="ml-2 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setCurrentImage(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;