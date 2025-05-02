import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserCircle, Search, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

const Navbar: React.FC = () => {
  const { user, logout, isRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClasses = 'px-3 py-2 text-primary-700 hover:text-accent-600 font-medium transition-colors';
  const navLinkActiveClasses = 'text-accent-700 border-b-2 border-accent-600';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-800">
                AgencyListings
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className={`${navLinkClasses} ${isActive('/') ? navLinkActiveClasses : ''}`}
                >
                  Home
                </Link>
                <Link
                  to="/listings"
                  className={`${navLinkClasses} ${isActive('/listings') ? navLinkActiveClasses : ''}`}
                >
                  Listings
                </Link>
                <Link
                  to="/categories"
                  className={`${navLinkClasses} ${isActive('/categories') ? navLinkActiveClasses : ''}`}
                >
                  Categories
                </Link>
                {isRole('agency') && (
                  <Link
                    to="/agency/dashboard"
                    className={`${navLinkClasses} ${isActive('/agency/dashboard') ? navLinkActiveClasses : ''}`}
                  >
                    My Dashboard
                  </Link>
                )}
                {isRole('admin') && (
                  <Link
                    to="/admin/dashboard"
                    className={`${navLinkClasses} ${isActive('/admin/dashboard') ? navLinkActiveClasses : ''}`}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Desktop right section */}
          <div className="hidden sm:flex sm:items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search listings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            {user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center max-w-xs bg-gray-100 rounded-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserCircle className="h-6 w-6 text-primary-700" />
                    <span className="ml-2 font-medium hidden md:block">{user.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4 text-primary-600" />
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 animate-fade-in">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      Signed in as <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    {isRole('agency') && (
                      <Link
                        to="/agency/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Agency Profile
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            {user && (
              <button className="p-2 mr-2 rounded-full text-primary-600 hover:text-primary-800 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-primary-600 hover:text-primary-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/listings"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Listings
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            {isRole('agency') && (
              <Link
                to="/agency/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Dashboard
              </Link>
            )}
            {isRole('admin') && (
              <Link
                to="/admin/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <UserCircle className="h-10 w-10 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-primary-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-primary-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {isRole('agency') && (
                    <Link
                      to="/agency/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Agency Profile
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Sign in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button fullWidth>
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;