import React from 'react';
import { Button } from '../components/ui/button';
import Carousel from './Carousel';
import ContentCard from './ContentCard';
import Vehicles from './Vehicles';
const HomePage = () => {
  return (
    <div>
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h2 className="text-sm text-green-600 font-semibold">
          #1 FLEET MAINTENANCE MANAGEMENT SOFTWARE
        </h2>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
          One place to manage
        </h1>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
          and maintain your fleet
        </h1>
        <br />
        <p className="mt-1 text-lg text-gray-600">
          Manage inspections, work orders, PM schedules, parts inventory and more in a single
        </p>
        <p className="mt-1 text-lg text-gray-600">
          dashboard. FleetMaster finds the data in your everyday operations and turns it into
        </p>
        <p className="mt-1 text-lg text-gray-600">
          powerful insights, so you can drive your fleet forward with confidence.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline" className="text-gray-700">
            Start Free Trial
          </Button>
          <Button variant="solid" className="bg-green-600 text-white hover:bg-green-700">
            Book a Demo
          </Button>
        </div>
      </div>
    </div><Carousel/>
    <br></br><br></br>
    <ContentCard/>
    <Vehicles/>

    </div>
  );
};

export default HomePage;
