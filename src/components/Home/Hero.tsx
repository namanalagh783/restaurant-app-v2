import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Calendar, BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <Crown className="h-16 w-16 text-royal-300 mx-auto mb-6 animate-bounce-gentle" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            Welcome to
            <span className="block text-royal-300">Maharaja Dining</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Experience the royal taste of authentic Indian cuisine in an atmosphere of elegance and tradition
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/booking"
              className="inline-flex items-center px-8 py-4 bg-royal-500 hover:bg-royal-600 text-burgundy-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Reserve Your Table
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center px-8 py-4 border-2 border-royal-300 text-royal-300 hover:bg-royal-300 hover:text-burgundy-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Menu
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="w-3 h-3 bg-royal-300 rounded-full animate-ping"></div>
        </div>
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <div className="w-4 h-4 bg-royal-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-royal-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-royal-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;