import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import Avatar from '../../components/ui/Avatar';
import axios from 'axios';
import Modal from './modal'; // Ensure the path is correct

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/drivers');
        setDrivers(response.data);
      } catch (err) {
        setError('Failed to fetch drivers');
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  if (loading) {
    return <p>Loading drivers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Drivers List</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.length > 0 ? (
          drivers.map((driver) => {
            // Ensure driverImage has a valid URL or path
            const driverImageUrl = driver.driverImage ? `http://localhost:8000/${driver.driverImage}` : '/path/to/default/avatar.jpg';

            return (
              <Card 
                key={driver._id} 
                className="w-80 bg-white shadow-lg rounded-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl flex flex-col items-center"
                onClick={() => handleDriverClick(driver)}
              >
                <Avatar name={driver.name} src={driverImageUrl} className="w-40 h-40 object-cover rounded-full mt-4 mb-2" />
                <CardHeader className="text-center px-4">
                  <CardTitle className="text-2xl font-bold">{driver.name}</CardTitle>
                  <CardDescription className="text-gray-600">{`Contact: ${driver.contactInfo}`}</CardDescription>
                </CardHeader>
                <CardContent className="text-center px-4 pb-4">
                  <p className="text-gray-600">{`License Number: ${driver.licenseNumber}`}</p>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p>No drivers available</p>
        )}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} driver={selectedDriver} />
    </div>
  );
};

export default DriverList;
