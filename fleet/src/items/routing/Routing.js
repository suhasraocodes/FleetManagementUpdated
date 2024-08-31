import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../components/ui/card'; // Adjust the path as needed
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const Routing = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (start && end) {
            // Remove existing routing control if any
            map.eachLayer(layer => {
                if (layer instanceof L.Routing.Control) {
                    map.removeLayer(layer);
                }
            });

            // Add new routing control
            const control = L.Routing.control({
                waypoints: [
                    L.latLng(start),
                    L.latLng(end)
                ],
                routeWhileDragging: true,
                router: L.Routing.osrmv1({
                    language: 'en',
                    profile: 'driving'
                })
            }).addTo(map);

            // Debugging
            console.log("Routing control added with waypoints:", start, end);

            // Clean up routing control on component unmount
            return () => {
                map.removeControl(control);
            };
        }
    }, [start, end, map]);

    return null;
};

const DriverAssignments = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch drivers
        axios.get('http://localhost:8000/drivers')
            .then(response => setDrivers(response.data))
            .catch(error => console.error('Error fetching drivers:', error));
    }, []);

    useEffect(() => {
        // Fetch assignments for selected driver
        if (selectedDriver) {
            axios.get(`http://localhost:8000/assign/driver/${selectedDriver}`)
                .then(response => {
                    console.log('Fetched assignments:', response.data);
                    setAssignments(response.data);
                    // Set the most recent assignment as default selection
                    if (response.data.length > 0) {
                        setSelectedAssignment(response.data[0]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching assignments:', error);
                    setError('Error fetching assignments');
                });
        }
    }, [selectedDriver]);

    return (
        <div className="p-4 flex flex-col items-center mt-16">
            <Card className="w-full bg-white shadow-lg rounded-lg mb-4">
                <h1 className="text-2xl font-bold mb-4">Driver Assignments</h1>
            </Card>

            <Card className="w-full bg-white shadow-lg rounded-lg mb-6 p-4">
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
            </Card>

            {error && <div className="text-red-500">{error}</div>}

            <Card className="w-full bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Assignments for {drivers.find(driver => driver._id === selectedDriver)?.name || 'Selected Driver'}</h2>
                {assignments.length === 0 ? (
                    <p>No assignments found.</p>
                ) : (
                    <ul>
                        {assignments.map(assignment => (
                            <li key={assignment._id} className="mb-2">
                                <div>Pickup Location: {assignment.pickupLocation.lat}, {assignment.pickupLocation.lng}</div>
                                <div>Destination Location: {assignment.destinationLocation.lat}, {assignment.destinationLocation.lng}</div>
                                <div>Pickup Date: {new Date(assignment.pickupDate).toLocaleDateString()}</div>
                                <div>Delivery Date: {new Date(assignment.deliveryDate).toLocaleDateString()}</div>
                                <button
                                    onClick={() => setSelectedAssignment(assignment)}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Show Route
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>

            {selectedAssignment && (
                <Card className="w-full bg-white shadow-lg rounded-lg p-4 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Route for {selectedAssignment.pickupDate}</h2>
                    <MapContainer
                        center={[selectedAssignment.pickupLocation.lat, selectedAssignment.pickupLocation.lng]}
                        zoom={14}
                        style={{ height: '600px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[selectedAssignment.pickupLocation.lat, selectedAssignment.pickupLocation.lng]}>
                            <Popup>Pickup Location</Popup>
                        </Marker>
                        <Marker position={[selectedAssignment.destinationLocation.lat, selectedAssignment.destinationLocation.lng]}>
                            <Popup>Destination Location</Popup>
                        </Marker>
                        <Routing
                            start={[selectedAssignment.pickupLocation.lat, selectedAssignment.pickupLocation.lng]}
                            end={[selectedAssignment.destinationLocation.lat, selectedAssignment.destinationLocation.lng]}
                        />
                    </MapContainer>
                </Card>
            )}
        </div>
    );
};

export default DriverAssignments;
