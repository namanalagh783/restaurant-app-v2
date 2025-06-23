import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Book Table', href: '/booking' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-burgundy-800 to-burgundy-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Crown className="h-8 w-8 text-royal-300 group-hover:text-royal-200 transition-colors" />
            <span className="text-xl font-display font-bold text-white">
              Maharaja Dining
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-royal-300 bg-burgundy-700'
                    : 'text-white hover:text-royal-300 hover:bg-burgundy-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-royal-300" />
                  <span className="text-white text-sm">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="bg-royal-500 text-burgundy-900 px-2 py-1 rounded-full text-xs font-medium">
                      Admin
                    </span>
                  )}
                </div>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-royal-300 hover:text-royal-200 transition-colors text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-white hover:text-royal-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-royal-300 transition-colors text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-royal-500 hover:bg-royal-600 text-burgundy-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-royal-300 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-burgundy-700 rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-royal-300 bg-burgundy-600'
                      : 'text-white hover:text-royal-300 hover:bg-burgundy-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-burgundy-600 pt-4 pb-2">
                  <div className="flex items-center px-3 pb-2">
                    <User className="h-5 w-5 text-royal-300 mr-2" />
                    <span className="text-white text-sm">{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="bg-royal-500 text-burgundy-900 px-2 py-1 rounded-full text-xs font-medium ml-2">
                        Admin
                      </span>
                    )}
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-royal-300 hover:text-royal-200 transition-colors text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center px-3 py-2 text-white hover:text-royal-300 transition-colors w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-burgundy-600 pt-4 pb-2 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-white hover:text-royal-300 transition-colors text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-royal-500 hover:bg-royal-600 text-burgundy-900 rounded-md text-sm font-medium transition-colors mx-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;