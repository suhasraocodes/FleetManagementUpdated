import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Modal = ({ isOpen, onClose, driver }) => {
  if (!isOpen || !driver) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 md:mx-0">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">{driver.name}</h2>
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
        </div>
        <div className="p-4">
          <img src={driver.image} alt={driver.name} className="w-32 h-32 object-cover rounded-full mb-4 mx-auto" />
          <p className="text-gray-600 mb-2"><strong>Location:</strong> {driver.location}</p>
          <p className="text-gray-600 mb-2"><strong>Truck:</strong> {driver.truck}</p>
          <p className="text-gray-600 mb-2"><strong>License Plate:</strong> {driver.licensePlate}</p>
          <p className="text-gray-600 mb-2"><strong>Year:</strong> {driver.year}</p>
          <p className="text-gray-600 mb-2"><strong>Model:</strong> {driver.model}</p>
          <p className="text-gray-600 mb-2"><strong>Driver License:</strong> {driver.license}</p>
          
          {/* Map Container */}
          <div className="mt-4 h-64 w-full">
            <MapContainer center={[driver.coordinates.lat, driver.coordinates.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[driver.coordinates.lat, driver.coordinates.lng]}>
                <Popup>
                  {driver.location}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
