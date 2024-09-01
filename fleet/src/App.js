import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './items/Navbar';
import Footer from './items/footer';
import { Toaster } from 'sonner';
import RoutesWrapper from './RoutesWrapper';
import { AuthProvider } from './contexts/authContext';
function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster />
        <main className="flex-grow">
          <RoutesWrapper />
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
