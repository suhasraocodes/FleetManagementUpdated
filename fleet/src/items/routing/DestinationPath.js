import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { Card } from '../../components/ui/card'; // Adjust the path as needed

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const Routing = ({ currentPosition, dummyLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (currentPosition && dummyLocation) {
            L.Routing.control({
                waypoints: [
                    L.latLng(currentPosition),
                    L.latLng(dummyLocation)
                ],
                routeWhileDragging: true,
                router: L.Routing.osrmv1({
                    language: 'en',
                    profile: 'driving'
                })
            }).addTo(map);
        }
    }, [currentPosition, dummyLocation, map]);

    return null;
};

const MapWithCurrentLocation = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [error, setError] = useState(null);
    const dummyLocation = [12.9716, 77.5946]; // Dummy location in Bangalore

    useEffect(() => {
        const fetchCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCurrentPosition([position.coords.latitude, position.coords.longitude]);
                    },
                    (err) => {
                        setError(err.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        fetchCurrentLocation();
    }, []);

    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!currentPosition) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4 flex flex-col items-center mt-16"> {/* Adjusted top margin */}
            <Card className="w-full bg-white shadow-lg rounded-lg mb-4">
                <h1 className="text-2xl font-bold mb-4">Map with Route Information</h1>
            </Card>
            <Card className="w-full bg-white shadow-lg rounded-lg">
                <MapContainer
                    center={currentPosition}
                    zoom={14}
                    style={{ height: '800px', width: '100%' }} // Further increased height
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={currentPosition}>
                        <Popup>Current Location</Popup>
                    </Marker>
                    <Marker position={dummyLocation}>
                        <Popup>Dummy Location (Bangalore)</Popup>
                    </Marker>
                    <Routing currentPosition={currentPosition} dummyLocation={dummyLocation} />
                </MapContainer>
            </Card>
        </div>
    );
};

export default MapWithCurrentLocation;
