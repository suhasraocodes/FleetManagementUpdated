import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import Avatar from '../../components/ui/Avatar';

const Modal = ({ isOpen, onClose, driver }) => {
  if (!isOpen || !driver) return null;

  // Ensure driverImage has a valid URL or path
  const driverImageUrl = driver.driverImage ? `http://localhost:8000/${driver.driverImage}` : '/path/to/default/avatar.jpg';

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl bg-white rounded-lg shadow-lg mx-4 md:mx-0">
        <CardHeader className="flex justify-between items-center p-4 border-b">
          <CardTitle className="text-2xl font-semibold">{driver.name}</CardTitle>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </CardHeader>
        <CardContent className="p-4 flex items-start">
          <Avatar name={driver.name} src={driverImageUrl} className="w-52 h-52 object-cover rounded-full mr-4" />
          <div className="flex flex-col justify-center">
            <p className="text-gray-600 mb-2"><strong>Contact:</strong> {driver.contactInfo}</p>
            <p className="text-gray-600 mb-2"><strong>License Number:</strong> {driver.licenseNumber}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Modal;
