import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'; // Adjust the path here

const vehicles = [
  { type: 'Trucks', count: 10, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-d_ok4o41sosOtDK8AeSDh2GHLu_wLDU48Q&s' },
  { type: 'Bus', count: 5, image: 'https://i.pinimg.com/736x/e4/38/5d/e4385d5498a380542f5497a0de60fcd7.jpg' },
  { type: 'Cars', count: 20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZuyQ3XZG7oRZOj-vd0IlVVNg35qfdY5aqHQ&s' },
  { type: 'Bikes', count: 15, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjKGKtx2zJ7LSW976lausgPnCqek8zWsDLmA&s' },
];

const Vehicles = () => {
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    if (type === 'Trucks') {
      navigate('/trucks');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {vehicles.map((vehicle, index) => (
        <Card 
          key={index} 
          className="w-80 bg-white shadow-lg rounded-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
          onClick={() => handleCardClick(vehicle.type)}
        >
          <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${vehicle.image})` }}></div>
          <CardHeader className="pt-4 px-4">
            <CardTitle className="text-2xl font-bold">{vehicle.type}</CardTitle>
            <CardDescription className="text-gray-600">{`Count: ${vehicle.count}`}</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {/* Add any additional content or actions here */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Vehicles;
