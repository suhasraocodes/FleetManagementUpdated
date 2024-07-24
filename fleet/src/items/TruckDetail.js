import React from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'; // Adjust the path here
import Avatar from '../components/ui/Avatar'; // Adjust the path here
import Badge from '../components/ui/Badge'; // Adjust the path here
import truckDetails from './trucks'; // Adjust the path if needed
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const TruckDetail = () => {
  const { id } = useParams();
  const truck = truckDetails[id];

  if (!truck) {
    return <div className="p-20">Truck details not found.</div>;
  }

  return (
    <div className="p-20 flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Truck {id} Details</CardTitle>
          <CardDescription className="text-gray-600">Detailed information about Truck {id}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={truck.image} alt={`Truck ${id}`} className="mb-4 w-full h-64 object-cover rounded-lg shadow-md" />
          <div className="flex items-center mb-4">
            <Avatar name={truck.driver} src={truck.driverImage} className="mr-4" />
            <div>
              <p className="text-xl font-semibold">{truck.driver}</p>
              <p className="text-gray-600">Driver</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2"><strong>Current Location:</strong> {truck.location}</p>
              <p className="mb-2"><strong>Specifications:</strong> {truck.specifications}</p>
              <p className="mb-2"><strong>Next Scheduled Maintenance:</strong> {truck.maintenance}</p>
              <p className="mb-2"><strong>Capacity:</strong> {truck.capacity}</p>
              <p className="mb-2"><strong>Fuel Type:</strong> {truck.fuelType}</p>
              <p className="mb-2"><strong>Status:</strong> <Badge>{truck.status}</Badge></p>
            </div>
            <div>
              <MapContainer center={[truck.coordinates.lat, truck.coordinates.lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[truck.coordinates.lat, truck.coordinates.lng]}>
                  <Popup>
                    {truck.location}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruckDetail;
