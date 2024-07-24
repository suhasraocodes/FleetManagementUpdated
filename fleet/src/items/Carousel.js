import React from 'react';

const Carousel = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="relative w-full overflow-hidden" style={{ height: '80vh' }}> {/* Set custom height here */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div> {/* Semi-transparent black overlay with rounded corners */}
        <div className="relative w-full h-full overflow-hidden rounded-lg"> {/* Full size container with rounded corners */}
          <video autoPlay loop muted className="w-full h-full object-cover rounded-lg"> {/* Apply rounded corners to video */}
            <source src="vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
