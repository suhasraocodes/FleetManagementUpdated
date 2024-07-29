import React, { useState } from 'react';
import drivers from './drivers'; // Adjust the path if needed
import Modal from './modal';

const DriversList = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Drivers List</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
            onClick={() => openModal(driver)}
          >
            <img src={driver.image} alt={driver.name} className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{driver.name}</h2>
            <p className="text-gray-600">{driver.location}</p>
            <p className="text-gray-600">Truck: {driver.truck}</p>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} driver={selectedDriver} />
    </div>
  );
};

export default DriversList;
