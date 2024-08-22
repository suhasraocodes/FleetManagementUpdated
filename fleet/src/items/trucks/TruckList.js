import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import axios from 'axios';

const TruckList = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/trucks');
        setTrucks(response.data);
      } catch (error) {
        console.error('Error fetching truck data:', error);
        setError('Failed to fetch trucks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  const handleTruckClick = (id) => {
    navigate(`/trucks/${id}`);
  };

  if (loading) {
    return <p>Loading trucks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 p-20">
      {trucks.length > 0 ? (
        trucks.map((truck) => {
          // Fix the backslashes in the image URL
          const imageUrl = truck.image ? `http://localhost:8000/${truck.image.replace(/\\/g, '/')}` : '/path/to/default/image.jpg';

          // Log the fixed image URL for debugging
          console.log('Fixed Image URL:', imageUrl);

          return (
            <Card 
              key={truck._id} 
              className="w-80 bg-white shadow-lg rounded-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
              onClick={() => handleTruckClick(truck._id)}
            >
              <div className="w-full h-48 bg-cover bg-center rounded-t-lg" 
                   style={{ 
                     backgroundImage: `url(${imageUrl})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundColor: '#ccc'
                   }}></div>
              <CardHeader className="pt-4 px-4">
                <CardTitle className="text-2xl font-bold">{`Truck ${truck.name}`}</CardTitle>
                <CardDescription className="text-gray-600">{`Driver: ${truck.driver}`}</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                {/* Add any additional content or actions here */}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p>No trucks available</p>
      )}
    </div>
  );
};

export default TruckList;
