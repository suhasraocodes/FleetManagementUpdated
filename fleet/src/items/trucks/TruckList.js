import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'; // Adjust the path here

const trucks = [
  { id: 1, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'John Doe' },
  { id: 2, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'Jane Smith' },
  { id: 1, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'John Doe' },
  { id: 2, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'Jane Smith' },
  { id: 1, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'John Doe' },
  { id: 2, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'Jane Smith' },
  { id: 1, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'John Doe' },
  { id: 2, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'Jane Smith' },
  { id: 1, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'John Doe' },
  { id: 2, image: 'https://wallpapers.com/images/featured/cool-trucks-cdvn4ttk7o8geggz.jpg', driver: 'Jane Smith' }
  // Add more trucks here
];

const TruckList = () => {
  const navigate = useNavigate();

  const handleTruckClick = (id) => {
    navigate(`/trucks/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 p-20">
      {trucks.map((truck) => (
        <Card 
          key={truck.id} 
          className="w-80 bg-white shadow-lg rounded-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
          onClick={() => handleTruckClick(truck.id)}
        >
          <div className="w-full h-48 bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${truck.image})` }}></div>
          <CardHeader className="pt-4 px-4">
            <CardTitle className="text-2xl font-bold">{`Truck ${truck.id}`}</CardTitle>
            <CardDescription className="text-gray-600">{`Driver: ${truck.driver}`}</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {/* Add any additional content or actions here */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TruckList;
