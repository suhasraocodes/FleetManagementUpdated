import React, { useState, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import HomePage from './items/Homepage';
import Vehicles from './items/Vehicles';
import TruckList from './items/trucks/TruckList';
import TruckDetail from './items/trucks/TruckDetail';
import DriverList from './items/driver/driverslist';
import Register from './items/Registration/Register';
import DriverRegister from './items/Registration/DriverRegister';
import MapWithCurrentLocation from './items/routing/DestinationPath';
import LoadingSpinner from './items/Loading';
import AssignmentPage from './items/routing/AssignRoutes';
const RoutesWrapper = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
        return () => clearTimeout(timer);
    }, [location]);

    return loading ? (
        <LoadingSpinner />
    ) : (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/trucks" element={<TruckList />} />
            <Route path="/trucks/:id" element={<TruckDetail />} />
            <Route path="/drivers" element={<DriverList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/driverreg" element={<DriverRegister />} />
            <Route path="/map" element={<MapWithCurrentLocation />} />
            <Route path="/assign" element={<AssignmentPage />} />    
            
        </Routes>
    );
};

export default RoutesWrapper;
