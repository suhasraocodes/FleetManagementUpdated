// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl font-bold mb-2">Stay Connected</h2>
          <p className="text-gray-400">Subscribe to our newsletter for the latest updates.</p>
        </div>
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-gray-400 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded transition-all duration-300 ease-in-out"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </form>
        <div className="mt-8 flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 0 0 1.88-2.35 8.28 8.28 0 0 1-2.71 1.03 4.19 4.19 0 0 0-7.23 3.82A11.87 11.87 0 0 1 3.16 4.9a4.19 4.19 0 0 0 1.3 5.59 4.19 4.19 0 0 1-1.9-.52v.05a4.18 4.18 0 0 0 3.36 4.1 4.21 4.21 0 0 1-1.89.07 4.19 4.19 0 0 0 3.91 2.9A8.37 8.37 0 0 1 2 19.54a11.79 11.79 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53A8.32 8.32 0 0 0 24 4.57a8.18 8.18 0 0 1-2.36.65 4.11 4.11 0 0 0 1.8-2.27" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.89 8.19 6.84 9.49.5.09.68-.22.68-.48v-1.73c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.82.09-.64.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02a9.57 9.57 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.67.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.93.36.31.69.92.69 1.86v2.76c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.04c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.44 8.05 7.81 8.73.57.09.77-.25.77-.55v-2.02c-3.17.69-3.84-1.42-3.84-1.42-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.75 1.19 1.75 1.19 1.02 1.75 2.67 1.24 3.32.94.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.65 0-1.25.45-2.26 1.19-3.05-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18.93-.26 1.93-.39 2.93-.39s2 .13 2.93.39c2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.24 2.75.12 3.04.75.79 1.19 1.8 1.19 3.05 0 4.4-2.67 5.36-5.21 5.65.41.35.76 1.02.76 2.06v3.05c0 .31.2.66.78.54C18.56 20.06 22 16.41 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
        </div>
        <div className="mt-8 text-gray-400">
          &copy; 2024 FleetMaster. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
