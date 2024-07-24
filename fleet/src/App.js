import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './items/Navbar';
import HomePage from './items/Homepage';
import Vehicles from './items/Vehicles';
import TruckList from './items/TruckList';
import TruckDetail from './items/TruckDetail';
import { CardWithForm } from './items/card';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/trucks" element={<TruckList />} />
          <Route path="/trucks/:id" element={<TruckDetail />} />
        </Routes>
      </div>
      <div className="flex justify-center items-center h-screen">
        <CardWithForm />
      </div>
    </Router>
  );
}

export default App;
