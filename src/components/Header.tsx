import React, { useState } from 'react';
import { Search, Menu, X, AlertTriangle, User, Bell } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = getCurrentUser();

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'info', label: 'Information' },
    { id: 'services', label: 'Services' },
    { id: 'branches', label: 'Branches' },
    { id: 'laws', label: 'Laws' },
    { id: 'news', label: 'News' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <div className="bg-white shadow-md">
      {/* Emergency Alert Banner */}
      <div className="bg-yellow-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Website Under Development - Some features may not be available.</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paradisal</h1>
            </div>
          </div>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </form>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="text-sm text-gray-600">
                  Welcome, {currentUser?.username || 'User'}
                </div>
                <button 
                  onClick={() => setCurrentPage('account')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <User className="w-4 h-4" />
                  <span>My Account</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t md:border-t-0 pt-4 md:pt-0`}>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 pb-4 md:pb-0">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;