import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { toast } from 'sonner';

const AssignmentPage = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [pickupLocation, setPickupLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [pickupDate, setPickupDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/drivers')
            .then(response => setDrivers(response.data))
            .catch(error => console.error('Error fetching drivers:', error));
    }, []);

    const handleMapClick = (e, setLocation) => {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    };

    const handleSubmit = () => {
        if (selectedDriver && pickupLocation && destinationLocation && pickupDate && deliveryDate) {
            axios.post('http://localhost:8000/assign/assignments', {
                driverId: selectedDriver,
                pickupLocation,
                destinationLocation,
                pickupDate,
                deliveryDate,
            })
                .then(response => {
                    toast.success('Assignment created successfully');
                })
                .catch(error => {
                    toast.error('Error creating assignment');
                    console.error('Error creating assignment:', error);
                });
        } else {
            toast.error('Please select all fields.');
        }
    };

    const LocationMarker = ({ setLocation }) => {
        useMapEvents({
            click: (e) => {
                handleMapClick(e, setLocation);
            },
        });

        return null;
    };

    return (
        <div className="pt-20 px-4 md:px-8 lg:px-16 mb-10"> {/* Added mb-10 class for bottom margin */}
            <h1 className="text-2xl font-bold mb-6">Create a New Assignment</h1>

            <div className="mb-6">
                <label htmlFor="driver" className="block text-lg font-medium mb-2">Select Driver:</label>
                <select
                    id="driver"
                    value={selectedDriver}
                    onChange={e => setSelectedDriver(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select a driver</option>
                    {drivers.map(driver => (
                        <option key={driver._id} value={driver._id}>{driver.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Select Pickup Location</h2>
                <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '300px', width: '100%' }} className="rounded-lg shadow-md">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {pickupLocation && <Marker position={[pickupLocation.lat, pickupLocation.lng]} />}
                    <LocationMarker setLocation={setPickupLocation} />
                </MapContainer>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Select Destination Location</h2>
                <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '300px', width: '100%' }} className="rounded-lg shadow-md">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {destinationLocation && <Marker position={[destinationLocation.lat, destinationLocation.lng]} />}
                    <LocationMarker setLocation={setDestinationLocation} />
                </MapContainer>
            </div>

            <div className="mb-6">
                <label htmlFor="pickupDate" className="block text-lg font-medium mb-2">Pickup Date:</label>
                <input
                    type="date"
                    id="pickupDate"
                    value={pickupDate}
                    onChange={e => setPickupDate(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="deliveryDate" className="block text-lg font-medium mb-2">Delivery Date:</label>
                <input
                    type="date"
                    id="deliveryDate"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Create Assignment
            </button>
        </div>
    );
};

export default AssignmentPage;
