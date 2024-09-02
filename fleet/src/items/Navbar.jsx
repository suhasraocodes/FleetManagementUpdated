import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenu(menuItem);
    setIsOpen(false); // Close menu on item click for mobile view
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Team', path: '/drivers' },
    { name: 'Register Truck', path: '/register' },
    { name: 'Register Driver', path: '/driverreg' },
    { name: 'Delivery', path: '/map' },
    { name: 'Assign', path: '/assign' },
  ];

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : '';
  };

  return (
    <nav className={`fixed w-full z-10 transition-colors duration-300 ${isScrolled ? 'bg-white text-black' : 'bg-gray-800 text-white'} shadow`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Navbar logo */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-black"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
          {/* Navbar items */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img className="lg:block h-8 w-auto" src="truck.png" alt="Workflow" />
              <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>FleetMaster</span>
            </div>

            {/* Desktop menu items */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`${activeMenu === item.name
                      ? 'bg-gray-900 text-white'
                      : `text-${isScrolled ? 'black' : 'gray-300'} hover:bg-gray-700 hover:text-${isScrolled ? 'black' : 'white'}`
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    onClick={() => handleMenuItemClick(item.name)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                {currentUser ? (
                  <>
                    <button
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={toggleMenu}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {getInitials(currentUser.email)}
                      </div>
                    </button>
                    {isOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
  to="/login"
  className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-900"
>
  Login
</Link>

                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`${activeMenu === item.name
                  ? 'bg-gray-900 text-white'
                  : `text-${isScrolled ? 'black' : 'gray-300'} hover:bg-gray-700 hover:text-${isScrolled ? 'black' : 'white'}`
                  } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => handleMenuItemClick(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
