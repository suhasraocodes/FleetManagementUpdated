import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import axios from 'axios';
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
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTruckDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/trucks/${id}`);
        setTruck(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTruckDetails();
  }, [id]);

  if (loading) return <div className="p-20">Loading...</div>;
  if (error) return <div className="p-20">Error: {error}</div>;
  if (!truck) return <div className="p-20">Truck details not found.</div>;

  // Fix the backslashes in the image URL
  const imageUrl = truck.image ? `http://localhost:8000/${truck.image.replace(/\\/g, '/')}` : '/path/to/default/image.jpg';

  // Fix the backslashes in the driver's image URL
  const driverImageUrl = truck.driverImage ? `http://localhost:8000/${truck.driverImage.replace(/\\/g, '/')}` : '/path/to/default/avatar.jpg';

  // Log the driver's image URL to the console
  console.log('Driver Image URL:', truck.driverImage);

  // Determine the badge color based on status
  const badgeClass = truck.status === 'Inactive' ? 'bg-red-500 text-white' : 'bg-green-100 text-green-800';

  return (
    <div className="p-20 flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Truck {truck.name} Details</CardTitle>
          <CardDescription className="text-gray-600">Detailed information about Truck {truck.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={imageUrl} alt={`Truck ${id}`} className="mb-4 w-full h-64 object-cover rounded-lg shadow-md" />
          <div className="flex items-center mb-4">
            <Avatar name={truck.driver} src={driverImageUrl} className="mr-4" />
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
              <p className="mb-2"><strong>Status:</strong> <Badge className={badgeClass}>{truck.status}</Badge></p>
              <p className="mb-2"><strong>License Plate:</strong> {truck.licensePlate}</p>
              <p className="mb-2"><strong>Year:</strong> {truck.year}</p>
              <p className="mb-2"><strong>Model:</strong> {truck.model}</p>
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
