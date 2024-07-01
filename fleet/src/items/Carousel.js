import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const slides = [
  {
    title: 'Slide 1',
    description: 'Description for slide 1',
    image: 'https://png.pngtree.com/thumb_back/fh260/background/20230524/pngtree-raleigh-port-trucks-for-moving-cargoes-at-night-image_2611127.jpg',
  },
  {
    title: 'Slide 2',
    description: 'Description for slide 2',
    image: 'https://static.vecteezy.com/system/resources/previews/027/868/408/non_2x/a-big-truck-is-driving-along-the-highway-delivering-goods-the-concept-of-logistics-and-delivery-routes-by-road-ai-generated-free-photo.jpg',
  },
  {
    title: 'Slide 3',
    description: 'Description for slide 3',
    image: 'https://images.ctfassets.net/grb5fvwhwnyo/A0gAWLyMPTck3dfGvCcT9/41212db1447902b5e5ebadd6db4077d9/card-sustainable-logistics-101.jpg',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="relative w-full overflow-hidden" style={{ height: '80vh' }}> {/* Set custom height here */}
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative w-full max-w-4xl mx-auto p-4">
        <div className="relative flex items-center justify-center">
          <button
            className="absolute left-0 p-2 bg-gray-800 bg-opacity-50 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <div className="flex-shrink-0 w-full max-w-4xl mx-auto">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-96 md:h-112 lg:h-128 xl:h-144 object-cover rounded-lg shadow-lg"
            />
            <h2 className="text-2xl text-white mt-4">{slides[currentIndex].title}</h2>
            <p className="text-white">{slides[currentIndex].description}</p>
          </div>
          <button
            className="absolute right-0 p-2 bg-gray-800 bg-opacity-50 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
