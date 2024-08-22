import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './items/Navbar';
import HomePage from './items/Homepage';
import Vehicles from './items/Vehicles';
import TruckList from './items/trucks/TruckList';
import TruckDetail from './items/trucks/TruckDetail';
import { CardWithForm } from './items/card';
import DriversList from './items/driver/driverslist';// Import the DriversList component
import Footer from './items/footer';// Import the Footer component
import Register from './items/Registration/Register';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/trucks" element={<TruckList />} />
            <Route path="/trucks/:id" element={<TruckDetail />} />
            <Route path="/drivers" element={<DriversList />} /> {/* Add this route */}
            <Route path="/register" element={<Register />} />
          </Routes>
          {/* <div className="flex justify-center items-center h-screen">
            <CardWithForm />
          </div> */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
